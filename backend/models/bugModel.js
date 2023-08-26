import mongoose from "mongoose"

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
    }
}, { timestamps: true });

// bug model
const Bug = mongoose.model('Bug', bugSchema);

export default Bug