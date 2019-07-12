//To create the model we need to create the schema which just hold the defferent field that we want this particular sorce to have.
//Tipically the name and convntion for the model, use upper case at the begining.
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.export = User = mongoose.model('user', UserSchema);