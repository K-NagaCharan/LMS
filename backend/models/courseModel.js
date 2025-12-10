import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        default: "assets/defaultImage.png"
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    tags: [
        {type: String}
    ]

}, {timestamps: true});

const courseModel = new mongoose.model("course", courseSchema);

export default courseModel;