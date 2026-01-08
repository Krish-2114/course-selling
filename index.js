require("dotenv").config();

const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const zod=require("zod");

const express = require("express");
const app = express();
const connectDB = require("./db").connectDB;
const userRouter = require("./user");
const courseRouter = require("./course");
const adminRouter = require("./admin");

app.use(express.json());
connectDB();

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
