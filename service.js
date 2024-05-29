// import admin from './model';
const user = require('./model');


const jwt = require('jsonwebtoken');

class UserServices {

    // Create a new user    
    static async registerUser(email, password, first_name, last_name, picture) {
        try {
            console.log(email, password, first_name, last_name, picture);

            const createUser = new user({ email, password, first_name, last_name, picture });
            return await createUser.save();
        } catch (err) {
            throw err;
        }
    }

    static async getUserByEmail(email) {
        try {
            return await user.findOne({ email });
        } catch (err) {
            console.log(err);
        }
    }

    static async checkUser(email) {
        try {
            return await user.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    static async generateAccessToken(tokenData) {
        return jwt.sign(tokenData, "lokman");
    }
}
module.exports= UserServices;