import connectMongo from "@/middlewares/connectMongo";
import User from "@/models/User";
import jsonWeb from "jsonwebtoken";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      let user = await User.findOne({
        email: req.body.email,
      });
      if (!user)
        user = await User.findOne({
          username: req.body.email,
        });

      if (!user) {
        return res.status(400).json({
          success: false,
          msg: "try different credentials",
        });
      }
      const token = jsonWeb.sign({ user }, "iamsecret", {
        expiresIn: 3 * 24 * 60 * 60 * 60 * 1000,
      });
      // console.log(token);
      const compare = await bcrypt.compare(req.body.password, user.password);
      if (compare) {
        return res.status(201).json({
          success: true,
          msg: "login successful",
          user,
          token,
        });
      } else {
        return res.status(400).json({
          success: false,
          msg: "try different credentials",
          user,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: error.message,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      msg: "invalid method",
    });
  }
};
export default connectMongo(handler);
