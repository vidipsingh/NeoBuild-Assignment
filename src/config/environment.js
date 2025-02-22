require('dotenv').config();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY
  },
  encryption: {
    key: process.env.ENCRYPTION_KEY
  }
};