const { Schema, model } = require('mongoose');

// Reaction Schema
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(), // Automatically generate an ObjectId
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280, // Maximum length for the reaction body
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Getter method for formatted createdAt date
reactionSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toLocaleString(); // Formats the date to a readable string
});

// Export the reactionSchema if needed elsewhere, otherwise, you can keep it as is
module.exports = reactionSchema;
