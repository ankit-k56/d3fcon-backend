const User = require("../models/User");
const submitFlag = async (req, res) => {
  try {
    const { flag } = req.body;
    const { id } = req.user;
    const user = await User.findBtId(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    switch (flag) {
      case "flag1":
        user.flag1 = true;
        break;
      case "flag2":
        user.flag2 = true;
        break;
      case "flag3":
        user.flag3 = true;
        break;
      default:
        return res.status(400).json({ message: "Invalid flag" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
