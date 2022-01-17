import jwt from "jsonwebtoken";

export default function getUserFromJWT(req) {
    const token = req.header('x-access-token')
    return jwt.decode(token, process.env.TOKEN_KEY)
}