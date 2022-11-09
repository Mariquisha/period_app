const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    forumPostId: {
        type: String, //MIGHT NEED TO CHANGE
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Comment', CommentSchema)