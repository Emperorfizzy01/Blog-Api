const Blog = require("../models/blog");
const Comment = require("../models/comment");

// @desc  GET blog post by pagination
// @route /api/blog?page=""&limit="" and /api/blog
exports.getBlogs = async(req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skipIndex = (page - 1) * limit;
        let blogs = [];

        blogs = await Blog.find()
          .sort({ _id: 1 })
          .limit(limit)
          .skip(skipIndex)
          .exec();
         
          return res.status(200).json({
            status: true,
            count: blogs.length,
            data: blogs
        })
          
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

// @desc GET blog post by id
// @route /api/blog/:id
exports.getOneBlog = async(req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)

        if(!blog) {
            return res.status(404).json({
                success: false,
                error: 'No blog with that id'
            })
        } else {
            return res.status(200).json({
                status: true,
                data: blog
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

// @desc POST blog post
// @route /api/blog
exports.postBlogs = async(req, res, next) => {
    try {
        const { author, title, content } = req.body;
        const blog = await new Blog({author, title, content}).save()

        return res.status(201).json({
            success: true,
            data: blog
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
};

// @desc UPDATE blog post
// @route /api/blog/:id
exports.updateOneBlog = async(req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if(!blog) {
            return res.status(401).json({
                success: false,
                error: 'No blog with such id'
            })
        } else {
            const { author, title, content} = req.body
            const blogs = await Blog.findOneAndUpdate({_id: req.params.id}, req.body)
            return res.status(200).json({
                status: true,
                data: blogs
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

// @desc DELETE blog post
// @route /api/blog/:id
exports.deleteBlog = async(req, res, next) => {
    try {
        const { id } = req.params
        const blog = await Blog.findById(id);
        if(!blog) {
            return res.status(401).json({
                success: false,
                error: 'No blog with such id'
            })
        }
        await Comment.deleteMany({ blogId: id}, null, async (err) => {
            if(!err){
                await blog.remove()
                return res.status(200).json({
                    status: true,
                    data: {}
                })
            } else {
                return res.status(400).json({
                    success: false,
                    error: 'Unable to delete blog'
                })
            }
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}



