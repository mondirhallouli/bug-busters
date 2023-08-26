import mongoose from 'mongoose'

// schema constructor
const Schema = mongoose.Schema;

// comment schema
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

// comment model
const Comment = mongoose.model('Comment', commentSchema);

export default Comment