const express = require("express");
const router = express.Router();
const { postComment, getComment, getAllComment, updateOneComment, deleteComment} = require("../controllers/comment");

router
    .route('/')
    .post(postComment);

router
    .route('/:id')
    .get(getComment)
    .put(updateOneComment)
    .delete(deleteComment)

router
    .route('/blog/:blogId')
    .get(getAllComment)


module.exports = router;