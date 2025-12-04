import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum:["student", "teacher"]
    },
    completedCources: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]},{ timestamps: true });


const userModel = new mongoose.model("User", userSchema);

export default userModel;