const { Router } = require("express");
const courseRouter = Router();
const { courseModel } = require("./db");

courseRouter.post("/purchase", function (req, res) {
    res.json({
        msg: "buy the courses"
    });
});

courseRouter.get("/preview", function (req, res) {
    res.json({
        msg: "courses"
    });
});

module.exports = courseRouter;
