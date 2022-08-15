const { Schema, model } = require('mongoose');

const schema = new Schema({
  content: {
    type: String,
    required: true
  },
  // Who has page with the comment
  pageId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Who left comment
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at' }
});

module.exports = model('Comment', schema);
