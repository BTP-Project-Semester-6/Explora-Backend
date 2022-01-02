const Post = require("../models/Post");

exports.newPost = (req, res) =>{
    const {
        location,
        author,
        photoUrl,
        description
    } = req.body;

    const likes = [],comments=[];
    
    const post = new Post({
        location,
        author,
        photoUrl,
        description,
        likes,
        comments
    });

    post.save((error, data) => {
        if (error) {
          console.log(error);
          return res.status(400).json({ error: "Adding Post Failed" });
        }
    
        if (data) {
          return res.status(200).json({
            message: "Success",
          });
        }
    });
};

exports.getPostbyID = (req,res) => {
    const userId = req.body.id;
    Post.find({ author: userId })
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((err) => {
      return res.status(400).json({ error: "Somthing went wrong" });
    });

}