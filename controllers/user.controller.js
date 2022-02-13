const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const { populate } = require("../models/User");

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
          telegram: data.telegram,
          instagram: data.instagram,
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
          telegram: data.telegram,
          instagram: data.instagram,
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

exports.getAllUsers = async (req, res) => {
  try {
    console.log("User runing");
    const users = await User.find().populate("posts.postId");

    return res.status(200).json({ users });
  } catch (error) {}
};
