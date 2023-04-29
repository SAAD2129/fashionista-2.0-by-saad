import connectMongo from "@/middlewares/connectMongo";
import User from "@/models/User";
import jsonWeb from "jsonwebtoken";
import { mailer } from "../utility/Mailer";
import bcrypt from "bcryptjs";
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      let user = await User.findOne({ email: req.body.email });
      // const

      if (user) {
        return res.status(400).json({
          success: false,
          msg: "try different information",
        });
      }
      const { username, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      user = await User.create({ username, email, password:hashed });
      const token = jsonWeb.sign({ user }, "iamsecret", {
        expiresIn: 3 * 24 * 60 * 60 * 60 * 1000,
      });
      mailer(req, res, {
        email: req.body.email,
        subject: "Account Created",
        msg: "Welcome to Fashionista,Your account has been created successfully",
        res: {
          statusCode: 201,
          success: true,
          msg: "account created successfully",
          user,
          token,
        },
      });
      // return res.status(201).json({});

    } catch (error) {
      return res.status(500).json({
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
