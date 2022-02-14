const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const fetch = require("node-fetch");

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
