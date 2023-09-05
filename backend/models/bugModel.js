import mongoose from "mongoose";
import { commentSchema } from "./commentModel.js";
import { userSchema } from "./userModel.js";

const Schema = mongoose.Schema;

// bug schema
const bugSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: userSchema,
        default: {},
        required: true,
    },
    comments: {
        type: [commentSchema],
        default: [],
    },
}, { timestamps: true });

// bug model
const Bug = mongoose.model('Bug', bugSchema);

export default Bug