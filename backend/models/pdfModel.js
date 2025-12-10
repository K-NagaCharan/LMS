import mongoose from "mongoose";


const pdfSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types,ObjectId,
        ref: "course",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    pdfPath: {
        type: String,
        required: true
    }
}, {timestamp: true});

const pdfModel = new mongoose.model("pdf", pdfSchema);

export default pdfModel;