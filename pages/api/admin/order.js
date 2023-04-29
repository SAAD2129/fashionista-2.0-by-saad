import connectMongo from "@/middlewares/connectMongo";
import isAuthenticated from "@/middlewares/isAuthenticated";
import Order from "@/models/Order";
const handler = async (req, res) => {
  isAuthenticated(req, res);
  const METHOD = req.method;
  if (METHOD === "PUT") {
    try {
      const { order_id } = req.headers;
      console.log(order_id);
      let order = await Order.findByIdAndUpdate(order_id, req.body);
      if (!order)
        return res.status(404).json({
          success: false,
          msg: "order not found",
        });
       order = await Order.findById(order_id);
      return res.status(200).json({
        success: true,
        order,
        msg: "order updated",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: error.message,
      });
    }
  } else if (METHOD === "GET") {
    try {
      const { order_id } = req.headers;
      console.log(order_id);
      const order = await Order.findById(order_id);
      if (!order)
        return res.status(404).json({
          success: false,
          msg: "order not found",
        });
      return res.status(200).json({
        success: true,
        order,
        msg: "order found",
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
