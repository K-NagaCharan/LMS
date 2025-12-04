import express from "express";
import mongoose from "mongoose";
import router from "./api/api.js";


const app = express();


app.use(express.json());
app.use("/api", router);



mongoose.connect("mongodb://127.0.0.1:27017/project")
    .then(() => {
        console.log("Connected to DB");
        app.listen(8000, () => console.log("Server id running"));
    })
    .catch(() => ("Failed to connect to DB"));