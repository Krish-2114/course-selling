const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// --------------------
// Admin Signup
// --------------------
adminRouter.post("/signup", async function (req, res) {
    const { email, password, firstName, lastName } = req.body;

    const salt = 5;
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const newAdmin = new adminModel({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        await newAdmin.save();
        res.json({ msg: "admin signed up" });

    } catch (error) {
        console.error("Error creating new admin:", error);
        return res.status(500).json({ error: "Failed to create admin" });
    }
});

// --------------------
// Admin Signin
// --------------------
adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email });
    if (!admin) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: admin._id, email: admin.email },
        process.env.JWT_SECRET
    );

    res.json({ token });
});

// --------------------
// Course routes
// --------------------
adminRouter.post("/course", function (req, res) {
    res.json({ msg: "course created" });
});

adminRouter.put("/course", function (req, res) {
    res.json({ msg: "course created" });
});

adminRouter.get("/course", function (req, res) {
    res.json({ msg: "course created" });
});

module.exports = adminRouter;
