const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDb = require("./db/connect");
const User = require("./models/User");
const authRouter = require("./routes/authRouter");
const submitRouter = require("./routes/submitRouter");

const authenticate = require("./middlewares/authenticate");

const app = express();
app.use(cors());
app.use(express.json());

// TEST ROUTES

app.use("/auth", authRouter);
app.use("/submit/", authenticate, submitRouter);
app.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const server = async () => {
  try {
    await connectDb(process.env.DATABASE_URL);

    app.listen(3030, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};
server();
