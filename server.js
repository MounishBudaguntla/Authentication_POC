require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandlers');

const app = express();
app.use(bodyParser.json());

connectDB();

app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
