const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: { 
        type: String,
        trim: true,
        required: [true, 'Specify authors name']
    },
    text: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
})

module.exports = mongoose.model('Comment', commentSchema)