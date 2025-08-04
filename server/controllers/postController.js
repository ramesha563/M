const Post = require('../models/Post');

// ➕ Create
const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const newPost = new Post({ title, content, category });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Post creation failed', error });
  }
};

// 📄 Read All
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts', error });
  }
};

// ✏️ Update
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, category },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error });
  }
};

// ❌ Delete
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error });
  }
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
};
