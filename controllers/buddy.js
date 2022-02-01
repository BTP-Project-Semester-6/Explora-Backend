const Buddy = require("../models/Buddy");

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
      return res.status(400).json({ error: "Adding Challenge Failed" });
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
  const { id, name, groupId } = req.body; // id and name of the person to add, groupId of group to which the new memeber will join
  Buddy.updateOne(
    { _id: groupId },
    {
      $addToSet: {
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

exports.addBuddyRequest = (req, res) => {
  return res.status(200).send({ message: "ok" });
};
