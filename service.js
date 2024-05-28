import admin, { findOne } from '..modelsadmin';

// eslint-disable-next-line no-undef
const jwt = require(jsonwebtoken);

class AdminServices {

    static async registerAdmin(email, mot_de_passe, nom, prenom, telephone, wilaya, photo) {
        try {
            // eslint-disable-next-line no-undef
            console.log(email,Password, email, mot_de_passe, nom, prenom, telephone, wilaya, photo);

            const createAdmin = new admin({ email, mot_de_passe, nom, prenom, telephone, wilaya, photo });
            return await createAdmin.save();
        } catch (err) {
            throw err;
        }
    }

    static async getAdminByEmail(email) {
        try {
            return await findOne({ email });
        } catch (err) {
            console.log(err);
        }
    }

    static async checkAdmin(email) {
        try {
            return await findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    static async generateAccessToken(tokenData, JWT_EXPIRE) {
        // eslint-disable-next-line no-undef
        return jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn, JWT_EXPIRE });
    }
}

export default AdminServices;