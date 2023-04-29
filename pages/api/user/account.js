import connectMongo from "@/middlewares/connectMongo";
import isAuthenticated from "@/middlewares/isAuthenticated";
import Address from "@/models/Address";
import User from "@/models/User";
import jsonWeb from "jsonwebtoken";
const handler = async (req, res) => {
  isAuthenticated(req, res);
  const METHOD = req.method;
  if (METHOD === "PUT") {
    try {
      let id = req.user._id;
      const {
        first_name,
        last_name,
        username,
        phone,
        city,
        street_address,
        zip,
        state,
      } = req.body;
      let user = await User.findById(id);
      if (!user) {
        return res.status(400).json({
          success: false,
          msg: "user not found",
        });
      }
      if (first_name) user.first_name = first_name;
      if (last_name) user.last_name = last_name;
      if (phone) user.phone = phone;
      if (username) user.username = username;
      user.save();
      let address;
      if (city && street_address && zip && state) {
        address = await Address.create({
          city,
          street_address,
          zip,
          state,
          user: user._id,
        });
      }
      return res.status(200).json({
        success: true,
        user,
        msg: "account updated",
        address,
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
  } else if (METHOD === "DELETE") {
    try {
      const { token } = req.headers;
      let data = jsonWeb.verify(token, "iamsecret");
      const user = await User.findByIdAndDelete(data.user._id);
      return res.status(200).json({
        success: true,
        user,
        msg: "account deleted successfully",
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
