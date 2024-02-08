import jwt, { decode } from 'jsonwebtoken';
import { run, closeBd, database } from "../../config/dbConnection.js";
import { ObjectId } from 'mongodb';

//verify token authentication
async function verifyToken(req, res, next) {
    try {
        //get unique token of the user
        const collection = database.collection("users");
        let id_user;

        //choose the request where the user id is being provided
        if (req.body.id_user) {
            id_user = new ObjectId(req.body.id_user);
        } else if (req.params.id) {
            id_user = new ObjectId(req.params.id);
        };

        await run()
        const uniqueToken = await collection.findOne({ "_id": id_user }, { projection: { "token": 1, "_id": 0 } })
        await closeBd();

        //return null of the uniqueToken
        if (!uniqueToken.token) {
            return res.status(401).json({ message: "Token not found" })
        }

        //tranform unique token in string
        const stringToken = String(uniqueToken.token);

        //verify token authentication
        const signature = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const token = jwt.verify(signature, stringToken)
        if (!token) {
            return res.status(401).json({ message: "Access denied!" })
        }
        next();
    } catch (err) {
        next(err)
    };
};

export default verifyToken;