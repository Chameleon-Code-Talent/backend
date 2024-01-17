import { MongoClient } from "mongodb";

const uri = process.env.DB_STRING_CONNECTION;
const client = new MongoClient(uri);
const database = client.db("ChamaleonPortfolio");

const run = async () => {
    try {
        await client.connect();
        await database.command({ ping: 1 });
        console.log("Connection to the database made successfully");
    } catch (erro) {
        console.error(erro);
    };
};

const closeBd = async () => {
    try {
        await client.close();
        console.log("Closed database");
    } catch (error) {
        console.log(error);
    };
};

export { run, closeBd, database };