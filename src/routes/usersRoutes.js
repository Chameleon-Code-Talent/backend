import express from "express";
import { run, closeBd, database } from "../../config/dbConnection.js";
import UserController from "../controller/userController.js";

const route = express.Router();

route.get("/", (req, res) => {
    res.send("you are on the test page users")
});

route.get("/users", UserController.searchUsers);
route.get("/users/:id", UserController.searchUserById);
route.post("/users", UserController.registerUser);
route.put("/users/:id", UserController.updateUser);
route.delete("/users/:id", UserController.deleteUser);

export default route;