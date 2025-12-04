import mongoose from "mongoose";


const pdfSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types,ObjectId,
        ref: "Course",
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

const pdfModel = new mongoose.model("PDF", pdfSchema);

export default pdfModel;