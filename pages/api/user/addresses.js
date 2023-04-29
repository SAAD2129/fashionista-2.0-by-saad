import connectMongo from "@/middlewares/connectMongo";
import isAuthenticated from "@/middlewares/isAuthenticated";
import Address from "@/models/Address";
const handler = async (req, res) => {
  isAuthenticated(req, res);
  const METHOD = req.method;
  if (METHOD === "GET") {
    try {
        console.log(req.user.createdAt.toString())
      const addresses = await Address.find({ user: req.user._id });
      if (!addresses) {
        return res.status(400).json({
          success: false,
          msg: "no addresses found",
        });
      }
      return res.status(200).json({
        success: true,
        msg: "addresses found",
        addresses,
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
