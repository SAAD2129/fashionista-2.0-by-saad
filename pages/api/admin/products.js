import connectMongo from "@/middlewares/connectMongo";
import Product from "@/models/Product";

const handler = async (req, res) => {
    let METHOD = req.method;
    switch (METHOD) {
        case "GET":
            {
                const products = await Product.find();

                if (!products) {
                    return res.status(404).json({
                        success: false,
                        msg: "resources not found",
                    });
                }

                res.status(200).json({
                    success: true,
                    products,
                    msg: "products found",
                });
            }
            break;
        case "DELETE":
            {
                const products = await Product.deleteMany();

                if (!products) {
                    return res.status(404).json({
                        success: false,
                        msg: "resources not found",
                    });
                }

                res.status(200).json({
                    success: true,
                    products,
                    msg: "products deleted",
                });
            }
            break;
        default:
            res.status(400).json({
                success: false,
                msg: "invalid method",
            });
    }
    // }
    // break;
};
export default connectMongo(handler);
