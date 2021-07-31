const express = require("express");
const router = express.Router();
const { getBlogs, postBlogs, getOneBlog, updateOneBlog, deleteBlog, getAllBlogs } = require("../controllers/Blog")


router
   .route('/')
   .get(getBlogs)
   .post(postBlogs)

router
   .route('/:id')
   .get(getOneBlog)
   .put(updateOneBlog)
   .delete(deleteBlog)


module.exports = router;