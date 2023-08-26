import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export async function requireAuth(req, res, next) {
    // check the user's auth
    const { authorization } = req.headers;
    // respond with an error if no auth
    if (!authorization) res.status(401).json({ error: "Authorization token required" });
    // extract token from auth string
    const token = authorization.split(" ")[1];
    try {
        // verify token and set the user's id to a prop on the request
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = await User.findOne({ _id: id });
        next();
    } catch (error) {
        // if verfication is not successful respond with an error
        res.status(400).json({ error: "Authorization is required" });
    }
}