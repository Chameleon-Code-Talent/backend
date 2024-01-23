import { run, closeBd, database } from "../../config/dbConnection.js";
import { ObjectId } from "mongodb";
const collection = database.collection("users");

class UserController {
    static async searchUsers(req, res) {
        try {
            await run();
            const result = await collection.find().toArray();
            await closeBd();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };

    static async searchUserById(req, res) {
        try {
            await run();
            const user = new ObjectId(req.params.id);
            const result = await collection.findOne({ "_id": user });
            await closeBd();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };

    static async registerUser(req, res) {
        try {
            const newUser = req.body;
            console.log(newUser)
            await run();
            const result = await collection.insertOne(newUser);
            res.status(200).json(result);
            await closeBd();
        } catch (err) {

            //catching validation error
            console.log(err.errInfo.details.schemaRulesNotSatisfied[0]);
            res.status(500).json({ message: "Server error", error: err.message });
        };
    };

    static async updateUser(req, res) {
        try {
            await run();
            const id_user = new ObjectId(req.params.id);
            const result = await collection.updateOne({ "_id": id_user }, { $set: req.body });
            await closeBd();
            res.status(200).json({ mensage: "User updated successfully" });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };

    static async deleteUser(req, res) {
        try {
            await run();
            const user = new ObjectId(req.params.id);
            const result = await collection.deleteOne({ "_id": user });
            await closeBd();
            res.status(200).json({ mensage: "User deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };
};

export default UserController;