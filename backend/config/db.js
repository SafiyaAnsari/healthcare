const mongoose = require('mongoose');

// open a single Mongo connection for the whole API
async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error('Mongo connection error:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;

