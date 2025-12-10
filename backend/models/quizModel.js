import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctOption: {
        type: Number,
        required: true
    }
});

export const questionModel = new mongoose.model("question", questionSchema);

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: {
        type: [questionSchema],
        default: []
    }
});

export const quizModel = new mongoose.model("quiz", quizSchema);