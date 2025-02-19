//create user model with required property

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    // Optional: additional fields, e.g., online status or profile picture
    isOnline: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true } // Automatically creates createdAt and updatedAt fields
);

module.exports = mongoose.model('User', userSchema);