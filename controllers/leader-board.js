const Player = require("../models/Player");

const getLeaderBoard = async () => {
  const players = await Player.find({})
    .sort({ score: -1 })
    .select("userName score")
    .limit(10)
    .exec()
    .catch((err) => {
      console.error(err);
    });

  return players;
};

module.exports = { getLeaderBoard };
