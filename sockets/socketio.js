const { Server } = require("socket.io");
const { getLeaderBoard } = require("../controllers/leader-board");

const startSocketIO = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", async (socket) => {
    socket.emit("change", global.leaderboardData);
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
};

module.exports = { startSocketIO };
