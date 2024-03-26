const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDb = require("./db/connect");
const User = require("./models/User");
const authRouter = require("./routes/authRouter");
const submitRouter = require("./routes/submitRouter");
const http = require("http");
const { startPlayerWatcher } = require("./watchers/user-watcher");
const { startSocketIO } = require("./sockets/socketio");

const PORT = 3000 || process.env.PORT;
const app = express();
const serverHttp = http.createServer(app);
app.use(cors());
app.use(express.json());

// TEST ROUTES

app.use("/auth", authRouter);
app.use("/submit/", submitRouter);
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
    const io = startSocketIO(serverHttp);
    await startPlayerWatcher(io);

    serverHttp.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};
server();
