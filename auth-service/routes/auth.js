const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Inscription
router.post('/register', async (req, res) => {
  const { userName, password, passwordReminder } = req.body;
  try {
    const existing = await User.findOne({ userName });
    if (existing) return res.status(400).json({ message: 'Utilisateur déjà existant' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ userName, password: hashedPassword, passwordReminder });
    await user.save();

    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user) return res.status(400).json({ message: 'Utilisateur introuvable' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    res.json({ message: 'Connexion réussie' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rappel de mot de passe
router.get('/reminder/:userName', async (req, res) => {
  const { userName } = req.params;
  try {
    const user = await User.findOne({ userName });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.json({ passwordReminder: user.passwordReminder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
