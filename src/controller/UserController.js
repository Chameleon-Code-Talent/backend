import { run, closeBd, database } from "../../config/dbConnection.js";
import { BSON, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/verifyToken.js";
import bcrypt from "bcrypt";

const collection = database.collection("users");
class UserController {

    static async searchUsers(req, res, next) {
        try {
            await run();
            const result = await collection.find().toArray();
            await closeBd();
            res.status(200).json(result);
        } catch (err) {
            console.log(err)
            await closeBd();
            next(err)
        };
    };

    static async searchUserById(req, res, next) {
        try {
            await run();
            const user = new ObjectId(req.params.id);
            const result = await collection.findOne({ "_id": user });

            //return null
            if (!result) {
                return res.status(404).json({ message: "User not found!" });
            }

            await closeBd();
            res.status(200).json(result);
        } catch (err) {
            console.log(err)
            await closeBd();
            next(err)
        };
    };

    static async registerUser(req, res, next) {
        try {
            //generate salt 12 bits and password criptograph
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(req.body.password, salt)

            req.body.password = passwordHash;

            const newUser = req.body;
            await run();
            const result = await collection.insertOne(newUser);

            //response of result operation
            res.status(200).json(result);
            await closeBd();
        } catch (err) {
            //catching validation error            
            await closeBd();
            next(err)
        };
    };

    /*controller for authentication user*/
    static async userAuthentication(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            //verify empty content or null
            if (!email || !password) {
                return res.status(400).json({ message: "The fields 'email' and 'password' is required!" })
            }

            await run();

            const userFound = await collection.findOne({ "email": email });

            //return null
            if (!userFound) {
                return res.status(404).json({ message: "User not found" })
            }

            //comparations hashs

            const checkPassword = await bcrypt.compare(password, userFound.password)
            console.log(checkPassword);

            //validate password
            if (!checkPassword) {
                return res.status(404).json({ message: "User not found" })
            }

            //user found or not found
            if (userFound) {
                const id = String(userFound._id)
                const itoken = jwt.sign({ id }, process.env.SECRET_KEY)
                await closeBd();
                res.status(200).json(itoken);
            } else {
                await closeBd();
                res.status(404).json({ message: "User not found" });
            }

        } catch (err) {
            console.log(err)
            await closeBd();
            next(err)
        }
    }

    static async updateUser(req, res, next) {
        try {
            const id_user = new ObjectId(req.params.id);

            await run();

            const result = await collection.updateOne({ "_id": id_user }, { $set: req.body });

            if (result.modifiedCount === 1) {
                //if is user was modified
                res.status(200).json({ mensage: "User updated successfully" });
            } else {
                //if is user was modified
                res.status(404).json({ message: "User not modified" });
            }
            await closeBd();
        } catch (err) {
            console.error(err)
            await closeBd();
            next(err)
        };
    };

    static async deleteUser(req, res, next) {
        try {
            await run();
            const user = new ObjectId(req.params.id);
            const result = await collection.deleteOne({ "_id": user });
            await closeBd();
            res.status(200).json({ mensage: "User deleted successfully" });
        } catch (err) {
            console.log(err)
            await closeBd();
            next(err)
        };
    };
};


export default UserController;

//65b2b428cb56900027f01799