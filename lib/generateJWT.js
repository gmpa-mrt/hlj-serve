import jwt from "jsonwebtoken";

export default function generateJWT(user) {
    return jwt.sign(
        { user_id: user._id, email: user.email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
    )
}