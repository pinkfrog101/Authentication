const mongoose = require('mongoose');
//userSchema defines the structure of user documents in MongoDB
//.Schema is part of Mongoose library that allows you to define the structure and data types of documents within a MongoDB collection
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }//automatically adds createdAt and updatedAt fields to the schema
);

module.exports = mongoose.model('User', userSchema);
