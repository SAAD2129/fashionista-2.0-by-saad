import connectMongo from "@/middlewares/connectMongo";
import isAuthenticated from "@/middlewares/isAuthenticated";
import User from "@/models/User";
import jsonWeb from "jsonwebtoken";
const handler = async (req, res) => {
  const METHOD = req.method;
  if (METHOD === "PUT") {
    isAuthenticated(req, res);
    try {
      const { user_id } = req.headers;
      let user = await User.findById(user_id);
      if (!user) {
        return res.status(400).json({
          success: false,
          msg: "user not found",
        });
      }
      user.role = "admin";
      user.save();
      return res.status(200).json({
        success: true,
        user,
        msg: "role updated to admin",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: error.message,
      });
    }
  } else if (METHOD === "GET") {
    try {
      // console.log(req.user)
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({
          success: false,
          msg: "user not found",
        });
      }
      return res.status(200).json({
        success: true,
        user,
        msg: "user found",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: error.message,
      });
    }
  } else if (METHOD === "POST") {
    console.log(req.body.email);
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
        msg: "invalid email or username",
      });
    }
    if (user.password === req.body.password) {
      res.status(200).json({
        success: true,
        msg: "admin logged in successfully",
      });
    } else {
      res.status(200).json({
        success: false,
        msg: "invalid credentials",
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
