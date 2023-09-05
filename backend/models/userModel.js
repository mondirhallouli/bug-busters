import mongoose from "mongoose"
import * as bcrypt from 'bcrypt';
import validator from "validator";

// schema constructor
const Schema = mongoose.Schema

// user schema
export const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// static signup method
userSchema.statics.signup = async function (username, email, password) {
    // make sure all fields are filled
    if (!username || !email || !password) throw Error("All fields must be filled");

    // check if the email already exists
    const exists = await this.findOne({ email });

    // if it already exists, throw error
    if (exists) {
        throw Error('this username or email already exists, try a new one');
    }

    // validate the email & password
    if (!validator.isEmail(email)) throw Error('email is not valid, try a different one');
    if (!validator.isStrongPassword(password)) throw Error('password is not strong enough');

    // hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create the user
    const user = await this.create({ username, email, password: hash });
    return user;
}

// static login method
userSchema.statics.login = async function (email, password) {
    // make sure all fields are filled
    if (!email || !password) throw Error("All fields must be filled");

    // check if the email doesn't exist
    const user = await this.findOne({ email });

    // throw error if no email matches
    if (!user) throw Error("email, password or both are incorrect");

    // compare the passwords
    const isValidPassword = await bcrypt.compare(password, user.password);

    // throw error if the passwords don't match
    if (!isValidPassword) throw Error("email, password or both are incorrect");

    // return the user
    return user;
}

// user model
const User = mongoose.model('User', userSchema);

export default User