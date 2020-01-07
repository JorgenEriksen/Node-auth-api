const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

    method: {
        type: String,
        enum: ["local", "google", "facebook"],
        required: true
    },
    local:{
        email: {
            type: String,
            min: 6,
            lowercase: true
        },
        password: {
            type: String,
            min: 8
        },
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
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
        if(this.method !== "local"){
            next();
        }
        // genererer salt
        const salt = await bcrypt.genSalt(10);
        // genererer hash
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        this.local.password = passwordHash;
        next();

    } catch(error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function (newPassword){
    try {
        return await bcrypt.compare(newPassword, this.local.password);
    } catch(error) {
        throw new Error(error);
    }
}

module.exports = mongoose.model("User", userSchema);