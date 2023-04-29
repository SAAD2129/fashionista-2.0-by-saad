import connectMongo from "@/middlewares/connectMongo";
import User from "@/models/User";

const handler = async (req, res) => {
  let METHOD = req.method;
  console.log('calle')
  if (METHOD === "GET") {
    try {
      const users = await User.find({role:"user"});

      if (!users) {
        return res.status(404).json({
          success: false,
          msg: "resources not found",
        });
      }

      return res.status(200).json({
        success: true,
        users,
        msg: "users found",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: error.message,
      });
    }
  }else if(METHOD === 'DELETE'){
    const users = await User.deleteMany();

      if (!users) {
        return res.status(404).json({
          success: false,
          msg: "resources not found",
        });
      }
      if (users) {
        return res.status(404).json({
          success: true,
          users,
          msg: "accounts deleted",
        });
      }
  }
};
export default connectMongo(handler);
