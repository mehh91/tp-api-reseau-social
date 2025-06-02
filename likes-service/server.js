const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const likeRoutes = require('./routes/likes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/likes', likeRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`❤️ Likes service running on port ${PORT}`);
});
