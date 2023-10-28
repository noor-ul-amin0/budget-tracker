const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
