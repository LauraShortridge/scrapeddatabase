var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var SavedSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
    unique: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true,
    unique: true
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  },
  
  image: {
    type: String,
    required: true,
    unique: true
  },

  id: {
    type: String,
    required: true
  }
});

SavedSchema.plugin(uniqueValidator);

// This creates our model from the above schema, using mongoose's model method
var Saved = mongoose.model("Saved", SavedSchema);

// Export the Article model
module.exports = Saved;
