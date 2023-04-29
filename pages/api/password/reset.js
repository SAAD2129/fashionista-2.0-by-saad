import connectMongo from "@/middlewares/connectMongo";
import User from "@/models/User";
import jsonWeb from "jsonwebtoken";
import { mailer } from "../utility/Mailer";
import bcrypt from "bcryptjs";


const handler = async (req, res) => {
  const METHOD = req.method;
  console.log(METHOD);
  if (METHOD === "POST") {
    try {

      const { token } = req.headers;
      const data = jsonWeb.verify(token,"iamsecret");
      const hashed = await bcrypt.hash(req.body.password, 10);
      const user = await User.findById(data.user._id);

      if (!user) {
        return res.status(401).json({
          success: false,
          msg: "invalid token",
        });
      }
      user.password = hashed;
      await user.save()
      return res.status(200).json({
        success: true,
        msg: "your password has been reset",
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
