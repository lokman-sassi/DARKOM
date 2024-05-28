/* eslint-disable no-undef */
export async function createAdmin(req, res, next) {
    try {
        console.log("---req body---", req.body);
        const { email, mot_de_passe, nom, prenom, telephone, wilaya, photo } = req.body;
        const duplicate = await AdminServices.getAdminByEmail(email);
        if (duplicate) {
            // throw new Error(`this ${email}, Already Registered`)
            return res.status(400).json({ status: false, message: `L'email ${email} est déjà enregistré` });
        }

        const admin = await AdminServices.registerAdmin(email, mot_de_passe, nom, prenom, telephone, wilaya, photo);

        let tokenData;
        tokenData = { _id: admin._id, email: email, role: "admin" };


        const token = await AdminServices.generateAccessToken(tokenData, "365d")


        res.json({ status: true, message: 'Admin enregistré avec succès', token: token, id: admin._id, data: admin });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}
//----------------------------
export async function loginAdmin(req, res, next) {
    try {
        const { email, mot_de_passe } = req.body;
        if (!email || !mot_de_passe) {
            return res.status(400).json({ status: false, message: 'Les paramètres ne sont pas corrects' });
        }
        let admin = await AdminServices.checkAdmin(email);
        if (!admin) {
            return res.status(404).json({ status: false, message: 'L\'administrateur n\'existe pas' });
        }
        const isMot_de_passeCorrect = await admin.compareMot_de_passe(mot_de_passe);
        if (isMot_de_passeCorrect === false) {
            return res.status(401).json({ status: false, message: 'Le nom d\'administrateur ou le mot de passe ne correspond pas' });
        }
        let tokenData;
        tokenData = { _id: admin._id, email: admin.email, role: "admin" };
        const token = await AdminServices.generateAccessToken(tokenData, "365d")
        res.status(200).json({ status: true, success: "Bien connecté", token: token, data: admin });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}