import { Int32, ObjectId } from "mongodb";
import { run, closeBd, database } from "../../config/dbConnection.js";

const conn = () => { run().catch(console.dir); };

async function createCollectionValidate() {
    if (!database.collection("users")) {
        database.createCollection("users", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "Users object validation",
                    required: ["name", "occupation_area", "password", "email", "phone", "description"],
                    properties: {
                        name: {
                            bsonType: String,
                            description: "'name' must be a string and is required"
                        },
                        email: {
                            bsonType: String,
                            description: "'email' is required"
                        },
                        occupation_area: {
                            bsonType: String,
                            description: "'Occupation area must be a string and is required '"
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
                        logo: {
                            bsonType: String
                        },
                        logo_layout: {
                            bsonType: String
                        },
                        password: {
                            bsonType: String,
                            description: "'password' is required"
                        }
                    }
                }
            }
        })
    }
};

/* 
{
  "name": "Igor",
  "password": "123",
  "email": "igor@hotmail.com",
  "github": "igoryan260",
  "phone": 11940047115,
  "description": "Gosto de trabalhar com design",
  "cv": "Engenheiro",
  "services": "Mecânica",
  "skills": "HTML, CSS, JS"
}
*/

export default createCollectionValidate;