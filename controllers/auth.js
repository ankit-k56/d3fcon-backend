const User = require("../models/User");
require("dotenv").config();
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UnAuthenticated = require("../errors/unauthenticated");
const NotFoundError = require("../errors/not-found");
const Badrequest = require("../errors/bad-request");
const asyncErrorHandler = require("../utils/AsyncErrorHandler");
const Player = require("../models/Player");
const setUserName = async (req, res) => {
  const { username, roll, password } = req.body;
  if (!username || !roll || !password) {
    throw new Badrequest("Username, roll or password not provided");
  }
  const user = await User.findOne({ roll });
  if (!user) {
    throw new NotFoundError("User not found");
  }
  //find user from roll no.
  const isPasswordcorrect = await compare(password, user.password);
  if (!isPasswordcorrect) {
    throw new UnAuthenticated("Password Incorrect");
  }
  //compare users password with password in schema
  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);
  const player = await Player.create({
    userName: username,
    password: password,
    user: user,
  });
  //create a player with username and password given
  const token = jwt.sign({ username: Player.userName }, process.env.SECRET, {
    expiresIn: "30d",
  });
  //jwt token(player id)
  res.status(200).json({ player, token });
};
const login = async (req, res) => {
  const { username, password } = req.body;
  const player = await Player.findOne({ userName });
  if (!player) {
    throw new NotFoundError("User not found");
  }
  const isPasswordcorrect = await compare(password, player.password);
  if (!isPasswordcorrect) {
    throw new UnAuthenticated("Password Incorrect");
  }
  const token = jwt.sign({ username: Player.userName }, process.env.SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ player, token });
};
//login function if auth correct then login success
