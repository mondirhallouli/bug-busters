import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
}, { timestamps: true });

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
    author: {
        type: String,
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