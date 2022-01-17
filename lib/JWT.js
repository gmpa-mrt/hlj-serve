import jwt from "jsonwebtoken";


export function generateJWT(user) {
    return jwt.sign(
        { user_id: user._id, email: user.email },
        process.env.TOKEN_KEY,
        { expiresIn: process.env.TOKEN_EXPIRATION }
    )
}


export function getUserFromJWT(req) {
    const token = req.header('x-access-token')
    return jwt.decode(token, process.env.TOKEN_KEY)
}