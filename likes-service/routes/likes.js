const express = require('express');
const router = express.Router();
const Like = require('../models/Like');
const axios = require('axios');


// Ajouter un like
router.post('/', async (req, res) => {
  const { userName, postId } = req.body;
  try {
    const alreadyLiked = await Like.findOne({ userName, postId });
    if (alreadyLiked) {
      return res.status(400).json({ message: "Déjà liké" });
    }

    const like = new Like({ userName, postId });
    await like.save();

    // 🔁 Appel à posts-service pour incrémenter
    await axios.put(`http://localhost:3002/api/posts/${postId}/like`);

    res.status(201).json(like);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Supprimer un like
router.delete('/', async (req, res) => {
  const { userName, postId } = req.body;
  try {
    await Like.findOneAndDelete({ userName, postId });

    // 🔁 Appel à posts-service pour décrémenter
    await axios.put(`http://localhost:3002/api/posts/${postId}/unlike`);

    res.json({ message: "Like supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Lister les likes d’un post
router.get('/:postId', async (req, res) => {
  try {
    const likes = await Like.find({ postId: req.params.postId });
    res.json({ totalLikes: likes.length, likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
