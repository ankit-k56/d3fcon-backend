require("dotenv").config();
const Player = require("../models/Player");
const submitFlag = async (req, res) => {
  try {
    const { flag } = req.body;
    const { id } = req.player;
    console.log(id);
    const player = await Player.findById(id);
    if (!player) {
      return res.status(404).json({ message: "User not found" });
    }
    switch (player.level) {
      // Checking the level of the player
      case 1:
        if (flag === process.env.FLAG1) {
          // Checking if all the questions of current level are done
          if (player.currentQuest != 4) {
            return res.status(400).json({
              message:
                "Do all the questions of current level to prceed to next level",
            });
          }
          // Updating the level of the player
          await Player.updateOne({ _id: id }, { level: 2, isStorySeen: false });
          res.status(200).json({ message: "Level 2 unlocked" });
        } else {
          return res.status(400).json({ message: "Invalid flag" });
        }
        break;
      case 2:
        if (flag === process.env.FLAG2) {
          if (player.currentQuest != 7) {
            return res.status(400).json({
              message:
                "Do all the questions of current level to prceed to next level",
            });
          }
          await Player.updateOne({ _id: id }, { level: 3, isStorySeen: false });
          res.status(200).json({ message: "Level 3 unlocked" });
        } else {
          return res.status(400).json({ message: "Invalid flag" });
        }
        break;
      case 3:
        if (flag === process.env.FLAG3) {
          if (player.currentQuest != 10) {
            return res.status(400).json({
              message:
                "Do all the questions of current level to prceed to next level",
            });
          }
          await Player.updateOne({ _id: id }, { level: 4, isStorySeen: false });
          res.status(200).json({ message: "Level 4 unlocked" });
        } else {
          return res.status(400).json({ message: "Invalid flag" });
        }
        break;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { submitFlag };
