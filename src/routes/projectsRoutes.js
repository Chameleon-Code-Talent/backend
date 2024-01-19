import express from "express";

const route = express.Router();

route.get("/", (req, res) => {
    res.send("you are on the test page projects")
});

export default route;