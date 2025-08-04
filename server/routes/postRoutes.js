const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  updatePost,
  deletePost
} = require('../controllers/postController');

// Middlewares
const authMiddleware = require('../middlewares/authMiddleware');

// Public: GET all
router.get('/', getPosts);

// Protected routes
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
