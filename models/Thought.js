const { Schema, model, Types } = require('mongoose');


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


// Schema to create Student model
const thoughtSchema = new Schema({
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
  reactions: [reactionSchema] // Array of nested documents using the reactionSchema
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
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;