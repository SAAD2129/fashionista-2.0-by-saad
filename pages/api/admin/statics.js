import connectMongo from "@/middlewares/connectMongo";
import isAuthenticated from "@/middlewares/isAuthenticated";
import Order from "@/models/Order";
import User from "@/models/User";
const handler = async (req, res) => {
  isAuthenticated(req, res);
  const METHOD = req.method;
  if (METHOD === "GET") {
    try {
      let earnings = 0,
        pendingAmount = 0,
        sales = 0;
      const allOrders = await Order.find();
      const customers = await User.count({role:"user"});
      for (let i = 0; i < allOrders.length; i++) {
        const e = allOrders[i];

        if (e.payment_status === "pending") pendingAmount += e.totalprice;
        if (e.payment_status === "paid") earnings += e.totalprice;
        sales += e.totalprice;
      }
      const pendingOrders = await Order.count({ order_status: "pending" });
      const completedOrders = await Order.count({ order_status: "completed" });
      const cancelledOrders = await Order.count({ order_status: "cancelled" });
      const admins = await User.count({ role: "admin" });
      const processingOrders = await Order.count({
        order_status: "processing",
      });
      earnings = earnings.toFixed(2);
      sales = sales.toFixed(2);
      return res.json({
        success: true,
        pendingOrders,
        processingOrders,
        cancelledOrders,
        pendingAmount,
        earnings,
        completedOrders,
        customers,
        admins,
        sales,
        totalOrders: allOrders.length,
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
