//To create the model we need to create the schema which just hold the defferent field that we want this particular sorce to have.
//Tipically the name and convntion for the model, use upper case at the begining.

//1 Bring in Monngoose 2 Create a variable call User Schema
//3 Set that to new Monngoose.Schema 4 Take in an object withh all the fields that we want
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);
