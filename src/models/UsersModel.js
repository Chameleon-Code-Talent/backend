import { run, closeBd, database } from "../../config/dbConnection.js";

const conn = () => { run().catch(console.dir); };

async function createCollectionValidate() {
    if (!database.collection("users")) {
        database.createCollection("users", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "Users object validation",
                    required: ["name", "password", "email"],
                    properties: {
                        name: {
                            bsonType: "string",
                            description: "'name' must be a string and is required"
                        },
                        email: {
                            bsonType: "string",
                            description: "'email' is required"
                        },
                        occupation_area: {
                            bsonType: "string",
                            description: "'Occupation area must be a string and is required '"
                        },
                        github: {
                            bsonType: "string"
                        },
                        phone: {
                            bsonType: "int",
                            description: "'phone' must be a number and is required"
                        },
                        description: {
                            bsonType: "string",
                            description: "'about me' is required"
                        },
                        cv: {
                            bsonType: "string",
                            description: "'cv' file not found"
                        },
                        logo: {
                            bsonType: "string"
                        },
                        logo_layout: {
                            bsonType: "string"
                        },
                        password: {
                            bsonType: "string",
                            description: "'password' is required"
                        }
                    }
                }
            }
        })
    }
};

export default createCollectionValidate;