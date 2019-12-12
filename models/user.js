const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    program: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre("save", async function (next){
    try {
        // genererer salt
        const salt = await bcrypt.genSalt(10);
        // genererer hash
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        next();

    } catch(error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function (newPassword){
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch(error) {
        throw new Error(error);
    }
}

module.exports = mongoose.model("User", userSchema);