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
  password: {
    type: String,
    required: true,
    minlength: 8, // This ensures the password is at least 8 characters long
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
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
const User = mongoose.model('User', userSchema);
module.exports = User;