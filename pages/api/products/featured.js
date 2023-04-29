import connectMongo from "@/middlewares/connectMongo";
import Product from "@/models/Product";
import jsonWeb from "jsonwebtoken";
const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      let products = await Product.find();
      if (!products) {
        return res.status(400).json({
          success: false,
          msg: "no products found",
        });
      }
      let featured = products.filter((product) => product.ratings > 4.5);
      return res.status(201).json({
        success: true,
        msg: "featured found successful",
        featured,
      });
    } catch (error) {
      res.status(500).json({
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
