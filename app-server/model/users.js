const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);