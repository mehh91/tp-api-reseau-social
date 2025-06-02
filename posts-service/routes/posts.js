const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Créer un post
router.post('/', async (req, res) => {
  const { userName, content } = req.body;
  try {
    const post = new Post({ userName, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtenir tous les posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer un post
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mettre à jour un post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Incrémenter le compteur de likes
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Décrémenter le compteur de likes
router.put('/:id/unlike', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: -1 } },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Décrémenter les likes
router.put('/:id/unlike', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: -1 } },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
