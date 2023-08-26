// user model
import User from "../models/userModel.js";
// jwt
import jwt from 'jsonwebtoken';

// token generator function 
function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3h' });
}

export async function login(req, res) {
    // save the user data to use it
    const { email, password } = req.body;

    // login user
    try {
        const user = await User.login(email, password);
        const token = generateToken(user._id);
        res.status(200).json({ username: user.username, email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function signup(req, res) {
    // save the user data to use it
    const { username, email, password } = req.body;

    // signup user
    try {
        const user = await User.signup(username, email, password);
        const token = generateToken(user._id);
        res.status(200).json({ username: user.username, email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}