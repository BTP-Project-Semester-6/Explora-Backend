const Post = require("../models/Post");
const User = require("../models/User");

exports.newPost = (req, res) => {
  const { location, author, photoUrl, description, tag } = req.body;

  const likes = [],
    comments = [];

  const post = new Post({
    location,
    author,
    photoUrl,
    description,
    likes,
    comments,
    tag,
  });

  post.save((error, data) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error: "Adding Post Failed" });
    }

    if (data) {
      User.updateOne(
        { _id: author },
        {
          $addToSet: {
            posts: {
              postId: data._id,
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
    }
  });
};

exports.getPostbyID = (req, res) => {
  console.log(req.body.id);
  const userId = req.body.id;
  User.findOne({ _id: userId })
    .then(async (data) => {
      const postId = data.posts;
      const posts = [];
      var ind = 0;
      postId.forEach((element, index) => {
        Post.findOne({ _id: element.postId })
          .then((data) => {
            posts.push(data);
          })
          .then(() => {
            // console.log(index, postId.length);
            if (ind == postId.length - 1) {
              return res.status(200).json({ posts: posts });
            } else {
              ind++;
            }
          });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: "Somthing went wrong" });
    });
};

exports.newComment = (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;
  const username = req.body.username;
  const message = req.body.message;
  Post.updateOne(
    { _id: postId },
    {
      $addToSet: {
        comments: {
          userId: userId,
          name: username,
          commentString: message,
        },
      },
    }
  )
    .then(async (data) => {
      res.status(200).json({ status: "success" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ status: "failed" });
    });
};

exports.likePost = (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;
  Post.updateOne(
    { _id: postId },
    {
      $addToSet: {
        likes: {
          userId: userId,
        },
      },
    }
  )
    .then(async (data) => {
      res.status(200).json({ status: "success" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ status: "failed" });
    });
};
exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find().populate("author", "name picUrl");
    res.status(200).json({
      allPosts,
    });
  } catch (error) {
    console.log(err);
    return res.status(400).json({ status: "failed" });
  }
};
