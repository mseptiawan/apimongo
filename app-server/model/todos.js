const mongoose = require('mongoose');
const Category = require('./categories'); // Pastikan path file sesuai dengan lokasi model Category
const User = require('./users'); // Pastikan path file sesuai dengan lokasi model User

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
    },
    completed: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
});

module.exports = mongoose.model('Todo', todoSchema);