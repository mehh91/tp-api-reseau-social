const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const postRoutes = require('./routes/posts');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`📨 Posts service running on port ${PORT}`);
});
