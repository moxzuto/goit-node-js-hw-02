const mongoose = require('mongoose');
require('dotenv').config();

const { MONGODB_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

async function connectToDB() {
  try {
    await mongoose.connect(MONGODB_URI, options);
    console.log('Database connection successful');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  }
}

module.exports = connectToDB;
