// import { Schema, model } from 'mongoose';
// import { genSalt, hash as _hash, compare } from "bcrypt";
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        // required: true
    },
 

}, { timestamps: true })

// Pre-save hook to hash password
UserSchema.pre("save", async function () {
    
    var user = this;
    if (!user.isModified("password")) {
        return;
    }
    try {
        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    } catch (err) {
        throw err;
    }
});

// Method to compare passwords during sign -in
UserSchema.methods.compareMot_de_passe = async function (candidateMot_de_passe) {
    try {
        const isMatch = await bcrypt.compare(candidateMot_de_passe, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};


const User = mongoose.model('User', UserSchema);
module.exports= User;
