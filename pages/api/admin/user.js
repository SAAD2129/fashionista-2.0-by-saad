import connectMongo from "@/middlewares/connectMongo";
import isAuthenticated from "@/middlewares/isAuthenticated";
import Order from "@/models/Order";
import User from "@/models/User";
const handler = async (req, res) => {
//   isAuthenticated(req, res);
  const METHOD = req.method;
  if (METHOD === "DELETE") {
    try {
      const { user_id } = req.headers;
      const user = await User.findByIdAndDelete(user_id)

      if(!user){
        return res.status(404).json({
            success: false,
            msg: "user not found",
          });
      }

      return res.status(200).json({
        success: true,
        msg: "user deleted",
        user
      });
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
