const { Server } = require("socket.io");
const { getLeaderBoard } = require("../controllers/leader-board");

const startSocketIO = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", async (socket) => {
    const player = await getLeaderBoard();
    socket.emit("change", player);
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
};

module.exports = { startSocketIO };
