const { getLeaderBoard } = require("../controllers/leader-board.js");
const Player = require("../models/Player.js");

const startPlayerWatcher = async (socketIO) => {
  Player.watch().on("change", async (change) => {
    try {
      topPlayers = await getLeaderBoard();
      global.leaderboardData = topPlayers;
      socketIO.emit("change", { data: topPlayers, change });
    } catch (error) {
      console.error(error);
      socketIO.emit("error", error);
    }
  });
};

module.exports = { startPlayerWatcher };
