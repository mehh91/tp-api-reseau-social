const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

dotenv.config();              // Charge les variables d'environnement
connectDB();                  // Connexion à MongoDB

app.use(express.json());      // Pour lire le JSON dans les requêtes
app.use('/api/auth', authRoutes);  // Routes pour l'authentification

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
