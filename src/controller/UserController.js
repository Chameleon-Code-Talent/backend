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

    /*controller for authentication user*/
    static async userAuthentication(req, res, next) {
        try {
            const email = req.body.email
            const password = req.body.password

            //verify empty content or null
            if (!email || !password) {
                return res.status(400).json({ message: "The fields 'email' and 'password' is required!" })
            }

            const userFound = await collection.findOne({ "email": email, "password": password });

            if (userFound) {
                res.status(200).json(userFound);
            } else {
                res.status(404).json({ message: "User not found" });
            }

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async updateUser(req, res) {
        try {
            await run();
            const id_user = new ObjectId(req.params.id);
            const verify = await verifyToken("itokenteste")
            if (verify === true) {
                const result = await collection.updateOne({ "_id": id_user }, { $set: req.body });
            } else {
                throw new Error("Acesso Negado");
            };
            await closeBd();
            res.status(200).json({ mensage: "User updated successfully" });
        } catch (err) {
            console.error(err);
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

async function verifyToken(meutoken) {

    const secretToken = process.env.TOKEN
    console.log(secretToken)

    if (meutoken == secretToken) {
        return true;
    }
};

export { UserController, verifyToken };