import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
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
    videoPath: {
        type: String,
        required: true
    }
}, {timestamps: true});

const videoModel = new mongoose.model("video", videoSchema);

export default videoModel;