const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} = require('../controllers/blogController');
const { getComments, createComment } = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

// Blog post routes
router.route('/')
  .get(getBlogPosts)
  .post(protect, createBlogPost);

router.route('/:id')
  .get(getBlogPost)
  .put(protect, updateBlogPost)
  .delete(protect, deleteBlogPost);

// Comment routes
router.route('/:postId/comments')
  .get(getComments)
  .post(protect, createComment);

module.exports = router;
