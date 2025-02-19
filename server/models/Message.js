const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    // Optional: If you want to track read/unread status
    read: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true } // This will add createdAt for the time the message was sent
);

module.exports = mongoose.model('Message', messageSchema);
