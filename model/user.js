const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        min: 6
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    dato: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema);