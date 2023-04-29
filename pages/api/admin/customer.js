import connectMongo from "@/middlewares/connectMongo";
import isAuthenticated from "@/middlewares/isAuthenticated";
import User from "@/models/User";

const handler = async (req, res) => {
  isAuthenticated(req, res);
  let METHOD = req.method;
  if (METHOD === "GET") {
    try {
      const { cus_id } = req.headers;
      console.log(cus_id)
      const user = await User.findById(cus_id);

      if (!user) {
        return res.status(404).json({
          success: false,
          msg: "resources not found",
        });
      }

      return res.status(200).json({
        success: true,
        customer:user,
        msg: "user found",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: error.message,
      });
    }
  }
};
export default connectMongo(handler);
