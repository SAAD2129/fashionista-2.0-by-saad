import connectMongo from "@/middlewares/connectMongo";
import User from "@/models/User";
import jsonWeb from "jsonwebtoken";
import { mailer } from "../utility/Mailer";
const handler = async (req, res) => {
  const METHOD = req.method;
  console.log(METHOD);
  if (METHOD === "POST") {
    try {
      console.log(req.body.email)
      const user = await User.findOne({ email: req.body.email });
      console.log(user)
      if (!user) {
        return res.status(400).json({
          success: false,
          msg: "email not found",
        });
      }
      const token = jsonWeb.sign({ user }, "iamsecret", {
        expiresIn: 150 * 2,
      });
      // console.log(process.env.HOST);
      let url = `${process.env.HOST}/forgot?token=${token}`;
      // console.log(url);
      mailer(req, res, {
        email: req.body.email,
        subject: "Forgot Password",
        msg: `Please click the link given to reset your password.This link will expire in 5 minutes to make your account secure ${url}`,
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
