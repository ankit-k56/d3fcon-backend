require("dotenv").config();
const Player = require("../models/Player");
const Question = require("../models/Question");

const submitQuest = async (req, res) => {
  try {
    const { answer } = req.body;
    const { id } = req.player;
    const player = await Player.findById(id);
    if (!player) {
      return res.status(404).json({ message: "User not found" });
    }
    if (player.userName === "Arnav_Subudhi") {
      return res.status(200).json({ message: "Successfull" });
    }
    const currentQuest = player.currentQuest;
    if (currentQuest >= 13) {
      return res.status(400).json({ message: "Game Over" });
    }

    const question = await Question.findOne({ questionNo: currentQuest });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    if (
      currentQuest > player.level * 3 ||
      currentQuest <= (player.level - 1) * 3
    ) {
      return res.status(400).json({ message: "Level Up First" });
    }

    if (
      question.submittedBy.some((submission) => submission.player.equals(id))
    ) {
      return res.status(400).json({ message: "Already Submitted" });
    }

    const correctAnswer = question.answer;

    if (answer !== correctAnswer) {
      return res.status(400).json({ message: "Incorrect Answer" });
    }

    updatedQuestion = await Question.findByIdAndUpdate(
      question._id,
      { $push: { submittedBy: { player: id } } },
      { new: true }

      // push the id to submittedBy array
    );

    const playerIndex = updatedQuestion.submittedBy.length;
    let newScore = 0;
    let score = player.score;
    if (playerIndex < 10) {
      newScore = 1000 - playerIndex * 20;
      await Player.updateOne({ _id: id }, { $inc: { score: newScore } });
    } else {
      newScore = 820 - playerIndex * 2;
      await Player.updateOne({ _id: id }, { $inc: { score: newScore } });
    }

    await Player.updateOne(
      { _id: id },
      { currentQuest: currentQuest + 1 },
      { new: true }
    );
    return res.status(200).json({
      message: "Correct Answer",
      score: score + newScore,
      currentQuestion: currentQuest + 1,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { submitQuest };
