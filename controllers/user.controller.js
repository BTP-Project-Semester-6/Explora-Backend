const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.addUser = (req, res) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    picUrl: req.body.picUrl,
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
    return res.status(200).json({
      user: {
        _id: data._id,
        name: data.name,
        username: data.username,
      },
    });
  });
};

exports.getUserById = (req, res) => {
  User.findById(req.body.userId).then((err, data) => {
    if (errr) {
      return res.status(400).send({ error: err });
    }
    const { passoword, ...responseData } = data;
    return res.status(200).send({
      responseData,
    });
  });
};
