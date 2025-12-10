import express from "express";
import userModel from "../models/userModel.js";
import courseModel from "../models/courseModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const router = express.Router();

//registering a new user
router.post("/register", async (req, res) => {
    try {
        const userCheck = userModel.findOne({email: req.body.email});
        if(userCheck)
            res.status(400).json({message: "Email already exist"});
        const newUser = new userModel(req.body);
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();
        res.status(200).json({message: "New user created successfully"});
    } catch(err) {
        res.status(400).json({message: err.errmsg});
    }
});


//logging a user in, here i need to create token and store in cookie storage
router.post("/login", async (req, res) => {
    try {
        const userInDb = await userModel.findOne({email: req.body.email});
        if(!userInDb)
            return res.status(400).json({message: "Invalid Email"});
        const isEqual = await bcrypt.compare(req.body.password, userInDb.password);
        if(!isEqual)
            return res.status(400).json({message: "Invalid password"});
        const token = jwt.sign({id: userInDb._id, role: userInDb.role}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        }).json({message: "Login successful", payLoad: userInDb});
    } catch(err) {
        return res.status(500).json({ message: "Server error" });
    }
});


//creating a new course
router.post("/create-course/teacherid/:teacherid", async (req, res) => {
    try {
        const teacherid = req.params.teacherid;
        const teacher = await userModel.findById(teacherid);
        if(!teacher)
            return res.status(404).json({ message: "Teacher not found" });
        if(teacher.role !== "teacher")
            return res.status(403).json({ message: "Only teachers can create courses" });
        const newCourse = await courseModel.create({...req.body, teacher: teacherid});
        await userModel.findByIdAndUpdate(teacherid, {$addToSet: {courses: newCourse._id}},{new: true});
        return res.status(201).json({message: "New course created and linked to teacher successfully",payLoad: newCourse});
        } catch(err) {
            res.status(500).json({message: `An error has occured`});
        }
});


//adding a new course to user
router.post("/enroll/userid/:userid/courseid/:courseid", async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.userid,{$addToSet:
                                                            {courses:req.params.courseid }},{ new: true})
                                                            .populate("courses");

    res.json({message: "Course added", payLoad: updatedUser});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



//get array of objects for student's/teacher's cources
router.get("/continue-courses/userid/:userid", async (req, res) => {
    try {
        const curUser = await userModel.findById(req.params.userid);
        const coursesArray = await curUser.populate("courses");
        // console.log(coursesArray);
        if(!curUser)
            return res.status(404).json({message: "User not found"});
        if(coursesArray.courses.length === 0)
            return res.status(404).json({message: "The user is yet to enroll in any course"})
        res.status(200).json({message: "Courses data retrived successfully", payLoad: coursesArray});
    } catch(err) {
        res.status(400).json({message: `Error has occured ${err}`});
    }
});


export default router;