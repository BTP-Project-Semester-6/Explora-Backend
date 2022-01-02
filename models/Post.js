const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    location: {type: String, trim: true},
    Author: {type:  mongoose.Schema.Types.ObjectId, ref: "User" },
    PhotoUrl:{type: String, trim: true},
    Description:{type: String, trim: true},
    Likes:[
        {
            type:  mongoose.Schema.Types.ObjectId, ref: "User"
        }
    ],
    Comments: [
        {userId:{type:  mongoose.Schema.Types.ObjectId, ref: "User"},
        commentString:{type: String, trim: true}}
    ]
});

module.exports=mongoose.model("Post",postSchema);