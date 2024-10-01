const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Student model
const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema], // Array of nested documents using the reactionSchema
});

// Getter method for formatted createdAt date
thoughtSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toLocaleString(); // Formats the date to a readable string
});

// Virtual property to get the count of reactions
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length; // Returns the length of the reactions array
});

// Include virtuals when converting to JSON
thoughtSchema.set('toJSON', { virtuals: true });

// Export the model
const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;