const Buddy = require("../models/Buddy");
const User = require("../models/User");
const fetch = require("node-fetch");
const mongoose = require("mongoose");

exports.createGroup = (req, res) => {
  const {
    groupMaxSize,
    city,
    dateOfArrival,
    dateOfDeparture,
    description,
    HostName,
    HostId,
  } = req.body;
  console.log(req.body);
  const _createGroup = new Buddy({
    groupMaxSize: groupMaxSize,
    city: city.toLowerCase(),
    description: description,
    dateOfArrival: dateOfArrival,
    dateOfDeparture: dateOfDeparture,
    Host: HostId,
    inGroup: [
      {
        username: HostName,
        id: HostId,
      },
    ],
  });
  _createGroup.save((error, data) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error: "Creating Buddy Failed" });
    }
    return res.status(200).json({
      message: "Success",
    });
  });
};

exports.getBuddyByCity = (req, res) => {
  console.log(req.body);
  const city = req.body.city.toLowerCase();
  Buddy.find({ city: city })
    .populate("Host", "-password")
    .then((_buddy) => {
      console.log(_buddy);
      return res.status(200).json(_buddy);
    })
    .catch((err) => {
      return res.status(440).json({ error: "Something went wrong" });
    });
};

exports.deleteGroup = (req, res) => {
  const { groupId, myId } = req.body;
  Buddy.findOne({ _id: groupId })
    .then((data) => {
      if (data.Host == myId) {
        Buddy.deleteOne({ _id: groupId })
          .then((data) => {
            return res.status(200).json({
              message: "Success",
            });
          })
          .catch((err) => {
            return res.status(400).json({ error: "Something went wrong" });
          });
      } else
        return res
          .status(400)
          .json({ error: "Only Host Permits to Delete Group" });
    })
    .catch((err) => {
      return res.status(400).json({ error: "Something went wrong" });
    });
};

exports.addBuddy = (req, res) => {
  const { id, username, groupId } = req.body; // id and name of the person to add, groupId of group to which the new memeber will join
  Buddy.updateOne(
    { _id: groupId },
    {
      $addToSet: {
        inGroup: {
          username: username,
          id: id,
        },
      },
      $pull: {
        requests: {
          username: username,
          id: id,
        },
      },
    }
  )
    .then((data) => {
      console.log(data);
      return res.status(200).json({
        message: "Success",
      });
    })
    .catch((err) => {
      return res.status(400).json({ error: "Something went wrong" });
    });
};

exports.removeBuddy = (req, res) => {
  const { id, name, groupId } = req.body; // id and name of the person to add, groupId of group to which the memeber will leave
  Buddy.updateOne(
    { _id: groupId },
    {
      $pull: {
        inGroup: {
          username: name,
          id: id,
        },
      },
    }
  )
    .then((data) => {
      return res.status(200).json({
        message: "Success",
      });
    })
    .catch((err) => {
      return res.status(400).json({ error: "Something went wrong" });
    });
};

exports.addBuddyRequest = async (req, res) => {
  try {
    const { groupId, id, username, hostId } = req.body;
    const hostDetails = await User.findById(hostId);
    const memberDetails = await User.findById(id);

    console.log(hostDetails);
    console.log(memberDetails);

    let similarity = "No similarity metric available!";

    if (memberDetails.quizAnswers !== undefined) {
      await fetch("https://explora-ml-backend.herokuapp.com/rank_buddies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_responses: hostDetails.quizAnswers,
          buddies: [
            {
              id: memberDetails.id,
              response: memberDetails.quizAnswers,
            },
          ],
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          similarity = (result.rankList[0].similarity * 100).toFixed(2) + "%";
        });
    }

    Buddy.updateOne(
      {
        _id: groupId,
      },
      {
        $addToSet: {
          requests: {
            username: username,
            id: id,
            similarity: similarity,
          },
        },
      }
    )
      .then((data) => {
        return res.status(200).json({
          message: "Success",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ error: "Something went wrong" });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error!" });
  }
};

exports.getBuddySimilarity = async (req, res) => {
  const groupId = req.params.id;
  let hostResponse;
  const requestData = [];
  const unRanked = [];
  const dataMap = new Map();
  const data = await Buddy.findById(groupId).populate("Host", "-password");
  hostResponse = data.Host.quizAnswers;
  console.log(data);
  // const re
  for (const ind in data.requests) {
    const reqItem = data.requests[ind];
    const userDetail = await User.findById(reqItem.id, {
      password: 0,
    });
    console.log(userDetail);
    if (userDetail.quizAnswers === undefined) {
      unRanked.push(userDetail);
    } else {
      requestData.push({
        id: userDetail._id,
        response: userDetail.quizAnswers,
      });
      dataMap.set(userDetail.id, userDetail);
    }
  }

  console.log(hostResponse);
  console.log(requestData);
  fetch("https://explora-ml-backend.herokuapp.com/rank_buddies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      user_responses: hostResponse,
      buddies: requestData,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      const responseData = [];
      result.rankList.forEach((item) => {
        responseData.push({
          userData: dataMap.get(item.id),
          similarity: item.similarity * 100,
        });
      });

      return res.status(200).json({
        message: "Success",
        rankedParticipants: responseData,
        unrankedParticipants: unRanked,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: "Internal server error!" });
    });
};

exports.getUserBuddyGroups = async (req, res) => {
  try {
    const userId = req.params.id;
    const allBuddies = await Buddy.find({}).populate("Host", "-password");
    console.log(allBuddies);
    const resBuddies = [];
    allBuddies.forEach((buddy) => {
      buddy.inGroup.forEach((member) => {
        if (member.id.toString() == userId) resBuddies.push(buddy);
      });
    });
    console.log(resBuddies);
    return res.status(200).send({
      message: "Ok",
      buddies: resBuddies,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Internal Server Error!",
    });
  }
};
