import mongoose from "mongoose";
import { Schema } from 'mongoose';
import { genSalt, hash as _hash, compare } from "bcrypt";
const ObjectId = mongoose.Types.ObjectId;


const UserSchema = new Schema({
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
    favorites: [{
        type: ObjectId,
        ref: 'FinalDB'
      }]      
}, { timestamps: true })

// Pre-save hook to hash password
UserSchema.pre("save", async function () {
    
    var user = this;
    if (!user.isModified("password")) {
        return;
    }
    try {
        const salt = await genSalt(10);

        const hash = await _hash(user.password, salt);
        user.password = hash;
    } catch (err) {
        throw err;
    }
});

// Method to compare passwords during sign -in
UserSchema.methods.compareMot_de_passe = async function (candidateMot_de_passe) {
    try {
        const isMatch = await compare(candidateMot_de_passe, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};


const User = mongoose.model('User', UserSchema);
export default User;
