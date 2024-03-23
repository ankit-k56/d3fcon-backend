const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDb = require("./db/connect");

const app = express();
app.use(cors());
app.use(express.json());

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
