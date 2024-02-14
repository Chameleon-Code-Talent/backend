import { run, closeBd, database } from "../../config/dbConnection.js";
import { ObjectId } from "mongodb";
const collection = database.collection("skills");
const collectionUser = database.collection("users");
class SkillController {
    static async searchSkills(req, res, next) {
        try {
            await run();
            const result = await collection.find().toArray();
            await closeBd();
            res.status(200).json(result);
        } catch (err) {
            next(err);
        };
    };

    static async searchSkillById(req, res, next) {
        try {
            await run();
            const Skill = new ObjectId(req.params.id);
            const result = await collection.findOne({ "_id": Skill });
            await closeBd();

            //if result null
            if (!result) {
                return res.status(404).json({ message: "No skills found" });
            }

            res.status(200).json(result);
        } catch (err) {
            next(err);
        };
    };

    static async registerSkill(req, res, next) {
        try {
            //verify filled fields
            if (req.body.id_user == "" || req.body.skills == "") {
                return res.status(400).json({ message: "some mandatory fields were not filled in" })
            }

            const newSkill = req.body;
            //variable where the new skill will be saved
            let addSkill;
            let addIconSkill;

            //configure icons patterns for saved in BD
            if (!newSkill.icon_skill || newSkill.icon_skill == "" || newSkill.icon_skill == [""]) {
                //variable in escope local for saved icons_skills patterns
                let iconsPatterns = [];

                newSkill.skills.forEach(element => {
                    iconsPatterns.push(`no-icon-${element}`);
                    newSkill.icon_skill = iconsPatterns;
                });
            }

            await run();
            //verify skills exists
            const skillExists = await collection.find().toArray();

            if (skillExists[0]) {
                //get id of the skill document and skill data
                const IdDocument = new ObjectId(skillExists[0]._id);
                const skillsExistsInTheDocument = skillExists[0].skills;
                const iconSkillExistsInTheDocument = skillExists[0].icon_skill;

                //comparing array of existing and new skills to find out if it already exists
                addSkill = newSkill.skills
                    .filter(skill => !skillsExistsInTheDocument
                        .includes(skill));

                //comparing array of existing and new icons skills to find out if it already exists
                addIconSkill = newSkill.icon_skill
                    .filter(icon_skill => !iconSkillExistsInTheDocument
                        .includes(icon_skill));

                //push the array to save new information without losing existing information

                skillsExistsInTheDocument.forEach(e => {
                    addSkill.push(e);
                });

                iconSkillExistsInTheDocument.forEach(e => {
                    addIconSkill.push(e)
                });

                //insert new changes in the document
                const modifiedSkill = {
                    "skills": addSkill,
                    "icon_skill": addIconSkill
                }

                const result = await collection.updateOne({ "_id": IdDocument }, { $set: modifiedSkill });
                await closeBd();

                return res.status(200).json({ message: "New skills inserted succesfully" })
            }

            const id_user = new ObjectId(newSkill.id_user);

            //check if the user exists to add the new project
            const checkUserExists = await collectionUser.findOne({ "_id": id_user })
            if (!checkUserExists) {
                return res.status(404).json({ message: "'The user you are trying to add a new project to does not exist, please check the user id!" })
            }


            const result = await collection.insertOne(newSkill);

            //check if the new user was created
            if (result.acknowledged == true) {
                res.status(200).json({ message: "Skill inserted succesfully!" });
            }

            await closeBd();
        } catch (err) {
            next(err);
        };
    };

    static async updateSkill(req, res, next) {
        try {
            const id_Skill = new ObjectId(req.params.id);
            const modifiedSkill = req.body

            //check if the user is trying to change the project author (id_user)
            if ("id_user" in modifiedSkill) {
                delete modifiedSkill.id_user
            }

            await run();
            const result = await collection.updateOne({ "_id": id_Skill }, { $set: modifiedSkill });
            await closeBd();

            //check if the project has been modified
            if (result.modifiedCount == 0) {
                res.status(200).json({ mensage: "Skill not modified" });
            } else {
                res.status(200).json({ mensage: "Skill updated successfully" });
            }
        } catch (err) {
            next(err);
        };
    };

    static async deleteSkill(req, res, next) {
        try {
            await run();
            const Skill = new ObjectId(req.params.id);
            const result = await collection.deleteOne({ "_id": Skill });
            await closeBd();
            if (result.deletedCount == 0) {
                res.status(200).json({ mensage: "No Skills deleted!" });
            } else {
                res.status(200).json({ mensage: "Skill deleted successfully" });
            }
        } catch (err) {
            next(err);
        };
    };
};

export default SkillController;