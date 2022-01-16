import jwt from "jsonwebtoken"

export const authJWT = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json({
            message: "A token is required for authentication"
        });
    }
    try {
        req.user = jwt.verify(token, process.env.TOKEN_KEY, null,null);
    } catch (e) {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
    return next();
}