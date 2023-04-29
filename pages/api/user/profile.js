import connectMongo from "@/middlewares/connectMongo";
import isAuthenticated from "@/middlewares/isAuthenticated";
import Address from "@/models/Address";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import jsonWeb from "jsonwebtoken";
const handler = async (req, res) => {
  isAuthenticated(req, res);
  if (req.method === "POST") {
    try {
      const user = await User.findById(req.user._id);
      user.profileImage.secret_url = req.body.secure_url;
      user.profileImage.public_id = req.body.public_id;
      user.save();

      res.status(200).json({
        msg: "photo uploaded successfully",
        user,
        success: true,
      });
    } catch (err) {
      res.status(500).json({ msg: err.message, success: false });
    }
  } else {
    res.status(400).json({
      success: false,
      msg: "invalid method",
    });
  }
};

export default connectMongo(handler);
