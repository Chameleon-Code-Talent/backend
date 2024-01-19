import { run, closeBd, database } from "../../config/dbConnection.js";

const conn = () => { run().catch(console.dir); };

async function createCollectionValidate() {
    // if (!database.collection("skills")) {
    database.createCollection("skills", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                title: "Skills object validation",
                required: ["id_user", "skills"],
                properties: {
                    id_user: {
                        bsonType: String,
                        description: "'id_user' must be a String and is required"
                    },
                    skills: {
                        bsonType: String,
                        description: "'Skill' is required"
                    },
                    icon_skill: {
                        bsonType: String
                    }
                }
            }
        }
    });
    //};
};

export default createCollectionValidate;