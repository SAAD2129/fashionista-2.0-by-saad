import connectMongo from "@/middlewares/connectMongo";
import isAuthenticated from "@/middlewares/isAuthenticated";
import Order from "@/models/Order";
const handler = async (req, res) => {
    isAuthenticated(req,res);
    const METHOD = req.method;
    if (METHOD === "GET") {
        try {
            let orders = await Order.find();
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
    } else if (METHOD === "DELETE") {
        try {
            let orders = await Order.deleteMany();
            if (orders) {
                return res.status(201).json({
                    success: true,
                    orders,
                    msg: "orders deleted successfully",
                });
            }
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
