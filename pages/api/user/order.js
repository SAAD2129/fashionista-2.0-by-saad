import connectMongo from "@/middlewares/connectMongo";
import Address from "@/models/Address";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import jsonWeb from "jsonwebtoken";
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      for (let i = 0; i < req.body.cart.length; i++) {
        const e = req.body.cart[i];
        const findProduct = await Product.findOne({ name: e.name });
        if (findProduct.stock === 0)
          return res.status(200).json({
            success: false,
            msg: `${e.name} is out of stock`,
          });
        if (findProduct.stock < e.qty)
          return res.status(200).json({
            success: false,
            msg: `we don't have enough quantity please! remove some`,
          });
      }

      const { token } = req.headers;
      const data = jsonWeb.verify(token, "iamsecret");
      const { email, username } = data.user;
      if (!req.body.addressDetails)
        return res.status(200).json({
          success: false,
          msg: `please select address to continue`,
        });
      let order = await Order.create({
        ordered_by: username,
        email,
        products: req.body.cart,
        address: req.body.addressDetails,
        totalprice: req.body.subtotal,
      });
      if (order) {
        for (let i = 0; i < req.body.cart.length; i++) {
          const e = req.body.cart[i];
          const findProduct = await Product.findOne({ name: e.name });
          //   console.log(findProduct);
          if (findProduct) {
            findProduct.stock -= e.qty;
            await findProduct.save();
          }
        }
        const orderingUser = await User.findById(data.user._id);
        orderingUser.moneySpent += order.totalprice;
        orderingUser.totalOrders++;
        orderingUser.save();
        order.payment_status = "paid";
        order.save();
        return res.status(201).json({
          success: true,
          order,
          msg: "order placed successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: error.message,
      });
    }
  } else if (req.method === "DELETE") {
    const order = await Order.findById(req.body.ORDER_ID);
    if (!order)
      return res.status(404).json({
        success: false,
        msg: "order not found",
      });
    const { token } = req.headers;
    const data = jsonWeb.verify(token, "iamsecret");
    const orderingUser = await User.findById(data.user._id);
    orderingUser.moneySpent -= order.totalprice;
    orderingUser.save();

    order.cancelled = true;
    order.order_status = "cancelled";
    orderingUser.totalOrders--;
    await order.save();
    return res.status(200).json({
      success: true,
      order,
      msg: "order cancelled",
    });
  } else {
    res.status(400).json({
      success: false,
      msg: "invalid method",
    });
  }
};

export default connectMongo(handler);
