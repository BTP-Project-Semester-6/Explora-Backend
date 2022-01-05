const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    location: {type: String, trim: true},
    author: {type:  mongoose.Schema.Types.ObjectId, ref: "User" },
    // author: {type: String },
    photoUrl:{type: String, trim: true},
    description:{type: String, trim: true},
    likes:[
        {
            type:  mongoose.Schema.Types.ObjectId, ref: "User"
        }
    ],
    comments: [
        {
            userId:{type:  mongoose.Schema.Types.ObjectId, ref: "User"},
            commentString:{type: String, trim: true}
        }
    ]
});

module.exports=mongoose.model("Post",postSchema);