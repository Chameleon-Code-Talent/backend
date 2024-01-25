import express from "express";
import { UserController, verifyToken } from "../controller/userController.js";

const route = express.Router();

route.get("/", (req, res) => {
    res.send("you are on the test page users")
});

route.get("/users", UserController.searchUsers);
route.get("/users/:id", UserController.searchUserById);
route.post("/auth/user", UserController.userAuthentication);
route.post("/users", UserController.registerUser);
route.put("/users/:id", UserController.updateUser);
route.delete("/users/:id", UserController.deleteUser);

export default route;