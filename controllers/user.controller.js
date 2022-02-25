const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const fetch = require("node-fetch");
const Post = require("../models/Post");
const { populate } = require("../models/User");
const Feedback = require("../models/feedback");

exports.addUser = (req, res) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    // picUrl: req.body.picUrl,
    age: req.body.age,
    gender: req.body.gender,
    password: bcrypt.hashSync(req.body.password, 9),
    email: req.body.email,
    posts: [],
    travelHistory: [],
    badges: [],
    telegram: req.body.telegram,
    instagram: req.body.instagram,
    friends: [],
  });

  newUser.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: "Adding User Failed" });
    }
    const token = jwt.sign(
      {
        _id: data._id,
        name: data.name,
        username: data.username,
      },
      process.env.JWT_secret_token,
      {
        expiresIn: "500h",
      }
    );
    return res.status(200).json({
      token,
    });
  });
};

exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((data, err) => {
      if (err) {
        return res.status(400).send({ error: "Could not find the given user" });
      }
      return res.status(200).send({
        user: {
          _id: data._id,
          name: data.name,
          username: data.username,
          guideId: data.guideId,
          picUrl: data.picUrl,
          age: data.age,
          email: data.email,
          gender: data.gender,
          posts: data.posts,
          travelHistory: data.travelHistory,
          badges: data.badges,
          friends: data.friends,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({ error: "Could not find the given user" });
    });
};

exports.getUserByUsername = (req, res) => {
  User.findOne({ username: req.params.username })
    .then((data, err) => {
      if (err) {
        return res.status(400).send({ error: "Could not find the given user" });
      }
      return res.status(200).send({
        user: {
          _id: data._id,
          name: data.name,
          username: data.username,
          guideId: data.guideId,
          picUrl: data.picUrl,
          age: data.age,
          email: data.email,
          gender: data.gender,
          posts: data.posts,
          travelHistory: data.travelHistory,
          badges: data.badges,
          friends: data.friends,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({ error: "Could not find the given user" });
    });
};

exports.loginUserByUsername = (req, res) => {
  console.log(req.body);
  User.findOne({ username: req.body.username })
    .then((data, err) => {
      if (err) {
        return res.status(400).send({ error: "Could not find the given user" });
      } else {
        bcrypt.compare(req.body.password, data.password, (reqq, match) => {
          if (match) {
            const token = jwt.sign(
              {
                _id: data._id,
                name: data.name,
                username: data.username,
              },
              process.env.JWT_secret_token,
              {
                expiresIn: "500h",
              }
            );
            return res.status(200).json({
              token,
            });
          } else {
            return res.status(400).send({ error: "Password Mismatch" });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({ error: "Could not find the given user" });
    });
};

exports.addPersonalityQuiz = (req, res) => {
  console.log("asd");
  User.findByIdAndUpdate(req.body.id, { quizAnswers: req.body.answers }).then(
    (data, err) => {
      if (err) {
        return res.status(500).send({ errors: "Some error occured!" });
      }
      return res.status(200).send({ message: "Successfully added quiz!" });
    }
  );
};
exports.allUserExceptHost = async (req, res) => {
  try {
    const id = req.body.id;
    const users = await User.find({ _id: { $ne: id } });
    res.status(200).json({
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "failed" });
  }
};

exports.getMyFriends = async (req, res) => {
  try {
    const id = req.body.id;
    const users = await User.findOne({ _id: id }).populate(
      "friends.friendId friendRequestSent.friendId friendRequestRecieved.friendId"
    );
    res.status(200).json({
      friends: users.friends,
      reqSent: users.friendRequestSent,
      reqRecieved: users.friendRequestRecieved,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "failed" });
  }
};

exports.search = async (req, res) => {
  try {
    const Name = req.body.name;
    let namePattern = new RegExp(Name, "i");
    User.find({ name: namePattern }).exec((err, data) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      console.log(data);
      return res.json({ data });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "failed" });
  }
};

exports.friendRequest = async (req, res) => {
  try {
    const fromId = req.body.fromId;
    const toId = req.body.toId;
    User.updateOne(
      { _id: fromId },
      {
        $addToSet: {
          friendRequestSent: {
            friendId: toId,
          },
        },
      }
    )
      .then(async (data) => {
        User.updateOne(
          { _id: toId },
          {
            $addToSet: {
              friendRequestRecieved: {
                friendId: fromId,
              },
            },
          }
        ).then(async (data) => {
          res.status(200).json({ status: "success" });
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ status: "failed" });
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "failed" });
  }
};

exports.AcceptfriendRequest = async (req, res) => {
  try {
    const Id1 = req.body.fromId;
    const Id2 = req.body.toId;
    await User.updateOne(
      { _id: Id1 },
      {
        $pull: {
          friendRequestSent: { friendId: Id2 },
          friendRequestRecieved: { friendId: Id2 },
        },
        $addToSet: { friends: { friendId: Id2 } },
      }
    );
    await User.updateOne(
      { _id: Id2 },
      {
        $pull: {
          friendRequestSent: { friendId: Id1 },
          friendRequestRecieved: { friendId: Id1 },
        },
        $addToSet: { friends: { friendId: Id1 } },
      }
    );
    return res.status(400).json({ status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "failed" });
  }
};

exports.suggestFriends = async (req, res) => {
  const userId = req.body.id;
  const userData = await User.findById(userId);
  const quizAnswers = userData.quizAnswers;

  const quizUsers = await User.find({
    quizAnswers: { $exists: true },
    _id: { $ne: userData._id },
  }).select("-password");

  console.log(quizUsers);

  const dataMap = new Map();

  const requestData = quizUsers.map((user) => {
    dataMap.set(user._id.toString(), user);
    return {
      id: user._id.toString(),
      response: user.quizAnswers,
    };
  });

  console.log(requestData);

  console.log(dataMap);

  fetch("https://explora-ml-backend.herokuapp.com/rank_buddies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_responses: userData.quizAnswers,
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
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: "Internal server error!" });
    });
};
exports.getAllUsers = async (req, res) => {
  try {
    console.log("User runing");
    const users = await User.find().populate("posts.postId");

    return res.status(200).json({ users });
  } catch (error) {}
};

exports.feedBack = async (req, res) => {
  const { subject, description, rating } = req.body;
  const newFeedback = new Feedback({
    subject,
    description,
    rating,
  });
  await newFeedback.save();
  return res.json({ message: "successs" });
};

exports.feedBackall = async (req, res) => {
  try {
    // console.log("User runing");
    const feed = await Feedback.find().sort({ created_at: -1 });

    return res.status(200).json({ message: feed });
  } catch (error) {}
};
