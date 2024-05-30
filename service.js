// import admin from './model';


import  pkg  from 'jsonwebtoken';
import user from './model.js';

const { sign } = pkg;
// Remove the unused import statement for 'findOne' from './model.js'

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
        return sign(tokenData, "lokman");
    }
}
export default UserServices;