require("dotenv").config();
const Player = require("../models/Player");
const Question = require("../models/Question");

const submitQuest = async (req, res) => {
    try {
        const {answer, id} = req.body;
        const player = await Player.findById(id);
        if (!player) {
            return res.status(404).json({message: "User not found"});
        }
        const currentQuest = player.currentQuest;

        const question = await Question.findOne({questionNo: currentQuest});
        if (!question) {
            throw new Error("Question not found");
        }

        const correctAnswer = question.answer;
        if(answer === correctAnswer) {
            const updatedQuestion = await Question.findOneAndUpdate(
                // push the id to submittedBy array
              );
        }

        const playerIndex = updatedQuestion.submittedBy.length;
        if(playerIndex < 10) {
            let score = 1000 - playerIndex*20;
            await Player.updateOne({_id: id}, {score: score});
        }
        else {
            let score = 820 - playerIndex*2;
            await Player.updateOne({_id: id}, {score: score});
        }

        await Player.updateOne({_id: id}, {currentQuest: currentQuest+1})
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {submitQuest};

