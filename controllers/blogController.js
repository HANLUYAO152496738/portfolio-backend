const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
const getBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single blog post with comments
// @route   GET /api/blog/:id
// @access  Public
const getBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'username');

    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    const comments = await Comment.find({ post: req.params.id })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json({ ...post.toObject(), comments });
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
  }
};

// @desc    Create a blog post
// @route   POST /api/blog
// @access  Private
const createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await BlogPost.create({
      title,
      content,
      author: req.user._id
    });

    const populatedPost = await post.populate('author', 'username');
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blog/:id
// @access  Private (Author only)
const updateBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this post');
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'username');

    res.json(updatedPost);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blog/:id
// @access  Private (Author only)
const deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this post');
    }

    // Delete associated comments
    await Comment.deleteMany({ post: req.params.id });

    await post.deleteOne();
    res.json({ message: 'Blog post removed' });
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
  }
};

module.exports = { getBlogPosts, getBlogPost, createBlogPost, updateBlogPost, deleteBlogPost };
