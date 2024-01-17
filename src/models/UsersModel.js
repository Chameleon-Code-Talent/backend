import { Int32 } from "mongodb";
import { run, closeBd, database } from "../../config/dbConnection.js";

const conn = () => { run().catch(console.dir); };

async function createCollectionValidate() {
    if (!database.collection("users")) {
        database.createCollection("users", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "Users object validation",
                    required: ["name", "password", "email", "phone", "description", "services", "skills"],
                    properties: {
                        name: {
                            bsonType: String,
                            description: "'name' must be a string and is required"
                        },
                        password: {
                            bsonType: String,
                            description: "'password' is required"
                        },
                        email: {
                            bsonType: String,
                            description: "'email' is required"
                        },
                        github: {
                            bsonType: String
                        },
                        phone: {
                            bsonType: Int32,
                            description: "'phone' must be a number and is required"
                        },
                        description: {
                            bsonType: String,
                            description: "'about me' is required"
                        },
                        cv: {
                            bsonType: String,
                            description: "'cv' file not found"
                        },
                        services: {
                            bsontype: String,
                            description: "'services' is required"
                        },
                        skills: {
                            bsonType: String,
                            description: "'skills' is required"
                        }
                    }
                }
            }
        })
    }
};

export default createCollectionValidate;