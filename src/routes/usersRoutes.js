import express from "express";
import UserController from "../controller/UserController.js";
import verifyToken from "../middlewares/verifyToken.js";
import errorManipulation from "../middlewares/errorManipulation.js";

const route = express.Router();

route.get("/", (req, res) => {
    res.send("you are on the test page users")
});

route.get("/users", UserController.searchUsers);
route.get("/users/:id", UserController.searchUserById);
route.post("/auth/user", UserController.userAuthentication);
route.post("/users", UserController.registerUser);
route.put("/users/:id", verifyToken, UserController.updateUser);
route.delete("/users/:id", UserController.deleteUser);

//route for error manipulations
route.use(errorManipulation);

export default route;