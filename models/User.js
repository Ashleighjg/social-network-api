const { Schema, model } = require('mongoose');


// Schema to create Student model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // This makes the username unique
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/, // This is a simple regex for email validation
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

// Virtual property to get the count of reactions
userSchema.virtual('friendCount').get(function () {
  return this.friends.length; // Returns the length of the reactions array
});

// Include virtuals when converting to JSON
userSchema.set('toJSON', { virtuals: true });

// Export the model
const User = model('User', userSchema);
module.exports = User;