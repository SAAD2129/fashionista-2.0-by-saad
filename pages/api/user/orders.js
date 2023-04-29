import connectMongo from "@/middlewares/connectMongo";
import isAuthenticated from "@/middlewares/isAuthenticated";
import Order from "@/models/Order";
// isAuthenticated;
const handler = async (req, res, next) => {
  isAuthenticated(req, res, next);
  console.log(req.user);
//   return;
  const METHOD = req.method;
  if (METHOD === "GET") {
    try {
      // const token
      let orders = await Order.find({ email: req.user.email });
      console.log(orders);
      if (orders) {
        return res.status(201).json({
          success: true,
          orders,
          msg: "orders found successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      msg: "invalid method",
    });
  }
};
export default connectMongo(handler);
