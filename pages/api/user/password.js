import connectMongo from "@/middlewares/connectMongo";
import User from "@/models/User";
import jsonWeb from "jsonwebtoken";
import bcrypt from "bcryptjs";
import isAuthenticated from "@/middlewares/isAuthenticated";
const handler = async (req, res) => {
  const METHOD = req.method;
  if (METHOD === "PUT") {
    isAuthenticated(req, res);
    try {
      const { oPassword, nPassword } = req.body;
      let user;
      const check = bcrypt.compare(oPassword, req.user.password);
      if (!check) {
        return res.status(400).json({
          success: false,
          msg: "old password is wrong",
        });
      } else {
        user = await User.findById(req.user._id);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(nPassword, salt);
        user.save();
      }
      return res.status(200).json({
        success: true,
        msg: "password changed successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: error.message,
      });
    }
  }
  res.status(400).json({
    success: false,
    msg: "invalid method",
  });
};
export default connectMongo(handler);
