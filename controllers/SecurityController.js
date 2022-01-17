import bcrypt from "bcrypt"
import {generateJWT} from "../lib/JWT.js";
import {responseWithOutPassword} from "../lib/normalizeJson.js";
import User from "../models/User.js"

export default class SecurityController {
    static login = async (req, res) => {
        const { email, password } = req.body
        try {
            const user = await User.findOne({ email })
            if (await bcrypt.compare(password, user.password)) {
                user.token = generateJWT(user)
                return res.status(200).json(responseWithOutPassword(user))
            } else {
                return res.status(401).json({ message: "Bad credentials" })
            }
        } catch (e) {
            // don't say if an account exist or not
            return res.status(401).json({ message: "Bad credentials" })
        }
    }
}
