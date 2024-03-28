const User = require("../models/User");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const Player = require("../models/Player");
const setUserName = async (req, res) => {
  try {
    const { username, roll, password } = req.body;
    if (!username || !roll || !password) {
      res
        .status(400)
        .json({ message: "Username, roll or password not provided" });
    }
    const user = await User.findOne({ roll });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.password !== password) {
      res.status(400).json({ message: "Password Incorrect" });
      return;
    }

    const alreadyExists = await Player.findOne({ user: user._id });
    if (alreadyExists) {
      res.status(400).json({ message: "Username already set" });
      return;
    }
    const existingPlayer = await Player.findOne({ userName: username });
    if (existingPlayer) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const player = await Player.create({
      userName: username,
      password: password,
      user: user._id,
    });

    const token = jwt.sign(
      { id: Player._id, userName: Player.userName },
      process.env.SECRET,
      {
        expiresIn: "30d",
      }
    );
    res.cookie("jwtToken", token, { httpOnly: true });
    return res
      .status(200)
      .json({
        userName: player.userName,
        level: player.level,
        currentQuestion: player.currentQuest,
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const player = await Player.findOne({ userName: username });
    if (!player) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (player.password !== password) {
      res.status(400).json({ message: "Password Incorrect" });
      return;
    }
    const token = jwt.sign(
      { id: player._id, userName: player.userName },
      process.env.SECRET,
      {
        expiresIn: "30d",
      }
    );
    res.cookie("jwtToken", token, { httpOnly: true });
    return res.status(200).json({
      player: player
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { setUserName, login };
