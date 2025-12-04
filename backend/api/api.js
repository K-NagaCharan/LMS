import express from "express";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";


const router = express.Router();


router.post("/register", async (req, res) => {
    try {
        const newUser = new userModel(req.body);
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();
        res.status(201).json({message: "New user created successfully"});
    } catch(err) {
        res.status(400).json({message: err.errmsg});
    }
});


export default router;