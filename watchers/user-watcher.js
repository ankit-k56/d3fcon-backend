const { getLeaderBoard } = require("../controllers/leader-board.js");
const Player = require("../models/Player.js");

const startPlayerWatcher = async (socketIO) => {
  Player.watch().on("change", async () => {
    try {
      topPlayers = await getLeaderBoard();
      socketIO.emit("change", topPlayers);
    } catch (error) {
      console.error(error);
      socketIO.emit("error", error);
    }
  });
};

module.exports = { startPlayerWatcher };
