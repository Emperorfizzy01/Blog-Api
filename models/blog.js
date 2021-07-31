const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    author: {
        type: String,
        trim: true,
        required: [true, 'Input name of author']
    },
    title: {
        type: String,
        trim: true,
        required: [true, 'Add a title']
    },
    content: {
        type: String,
        trim: true,
        required: [true, 'Content is empty']
    }
})

module.exports = mongoose.model('Blog', BlogSchema);