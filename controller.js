import UserServices from "./service.js";

export async function createUser(req, res, next) {
    try {
        console.log("---req body---", req.body);
        const { email, password, first_name, last_name, picture } = req.body;
        const duplicate = await UserServices.getUserByEmail(email);
        if (duplicate) {
            // throw new Error(`this ${email}, Already Registered`)
            return res.status(400).json({ status: false, message: `Email ${email} already registred` });
        }

        const user = await UserServices.registerUser(email, password, first_name, last_name, picture);
        //let tokenData;
        const tokenData = { _id: user._id, email: email, role: "user" };
        const token = await UserServices.generateAccessToken(tokenData, "365d")


        res.json({ status: true, message: 'User registred succefully', token: token, id: user._id, data: user });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}
//----------------------------
export async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: false, message: 'The parameters are incorrect' });
        }
        let user = await UserServices.checkUser(email);
        if (!user) {
            return res.status(404).json({ status: false, message: 'User doesn\'t exist' });
        }
        const isPasswordCorrect = await user.compareMot_de_passe(password);
        if (isPasswordCorrect === false) {
            return res.status(401).json({ status: false, message: 'Email or password inccorrect' });
        }
        //let tokenData;
        const tokenData = { _id: user._id, email: user.email, role: "user" };
        const token = await UserServices.generateAccessToken(tokenData, "365d")
        
        res.status(200).json({ status: true, success: "Succefully connected", token: token, data: user });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
  