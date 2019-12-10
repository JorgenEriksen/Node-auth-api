const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    Program: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema);