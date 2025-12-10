import mongoose from "mogoose";

const doubtSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doubt",
        default: null
    }
}, {timestamps: true});

const doubtModel = new mongoose.model("doubt", doubtSchema);

export default doubtModel;