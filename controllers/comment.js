const Comment = require("../models/comment")

// @desc  POST blog comment
// @route /api/comment
exports.postComment = async(req, res, next) => {
    try{
        const { author, text, blogId } = req.body
        const comment = await new Comment({ author, text, blogId }).save()

        return res.status(201).json({
            success: true,
            data: comment
        }) 
    } catch(err) {
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
    
            return res.status(400).json({
                success: false,
                error: messages
            })
         } else {
            return res.status(500).json({
                success: false,
                error: 'Server error'
            })
         }
    }
        
}

// @desc   GET single blog comment
// @route /api/comment/:id
exports.getComment = async(req, res, next) => {
    try{
        const comment = await Comment.findById(req.params.id)

        if(!comment) {
            return res.status(401).json({
                success: false,
                error: 'No comment with such id'
            })
        } else {
            return res.status(200).json({
                status: true,
                data: comment
            })
        }
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }       
}

// @desc   GET single blog comment
// @route /api/comment/blog/blogId
exports.getAllComment = async(req, res) => {
    try{
        const { blogId } = req.params
        const comments = await Comment.find({ blogId })

        if(!comments) {
            return res.status(401).json({
                success: false,
                error: 'No comment with such id'
            })
        } else {
            return res.status(200).json({
                status: true,
                count: comments.length,
                data: comments
            })
        }
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }       
}


// @desc UPDATE comment
// @route /api/comment/:id
exports.updateOneComment = async(req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if(!comment) {
            return res.status(401).json({
                success: false,
                error: 'No blog with such comment id'
            })
        } else {
            const { author, text } = req.body
            const updatedComment = await Comment.findOneAndUpdate({_id: req.params.id}, {author, text})
            return res.status(200).json({
                status: true,
                data: updatedComment
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
};

// @desc DELETE comment
// @route /api/comment/:id
exports.deleteComment = async(req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if(!comment) {
            return res.status(401).json({
                success: false,
                error: 'No comment with such id'
            })
        } else {
            await comment.remove()
            return res.status(200).json({
                status: true,
                data: {}
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

// @desc   GET single blog comment
// @route /api/comment/blog/blogId
// exports.deleteAllComments = async(req, res) => {
//     try{
//         const { blogId } = req.params
//         await Comment.deleteMany({ blogId }, null, (err) => console.log(err))
//         // if(!deletedComments) {
//         //     return res.status(401).json({
//         //         success: false,
//         //         error: 'No comment with such id'
//         //     }) 
//         // } else {
//         //     return res.status(200).json({
//         //         status: true,
//         //         data: {}
//         //     })
//         // }
//     } catch(err) {
//         console.log(err);
//     }       
// }

