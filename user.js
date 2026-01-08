const { Router } = require("express");
const userRouter = Router();
const { userModel } = require("./db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/signup", async function (req, res) {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
    }

    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        const newUser = new userModel({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        await newUser.save();
        res.status(201).json({ msg: "signup successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create user" });
    }
});

userRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET
    );

    res.json({ token });
});

module.exports = userRouter;
