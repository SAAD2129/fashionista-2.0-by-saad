import connectMongo from "@/middlewares/connectMongo";
import Product from "@/models/Product";
import Review from "@/models/Review";

const handler = async (req, res) => {
  let METHOD = req.method;
  console.log(METHOD);
  if (METHOD === "POST") {
    console.log("post");
    try {
      const product = await Product.create(req.body);
      res.status(201).json({
        success: true,
        product,
        msg: "product created successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        msg: err.message,
      });
    }
  } else if (METHOD === "GET") {
    try {
      const { product_id } = req.headers;
      const product = await Product.findById(product_id);
      const reviews = await Review.find({ product_id });

      if (!product) {
        return res.status(404).json({
          success: false,
          msg: "resources not found",
        });
      }

      res.status(200).json({
        success: true,
        product,
        reviews,
        msg: "product found",
      });
    } catch (error) {
      res.status(500).json({
        success: true,
        msg: error.message,
      });
    }
  } else if (METHOD === "PUT") {
    const { product_id } = req.headers;
    let product;
    try {
      product = await Product.findOneAndUpdate({ _id: product_id }, req.body);
      if (!product) {
        return res.status(404).json({
          success: false,
          msg: "resources not found",
        });
      }
      product = await Product.findById(product_id);

      res.status(200).json({
        success: true,
        product,
        msg: "product updated",
      });
    } catch (error) {
      if (error.type === "CASTERROR") console.log("casterror");
    }
  } else if (METHOD === "DELETE") {
    const { product_id } = req.headers;
    try {
      const product = await Product.findByIdAndDelete(product_id);

      if (!product) {
        return res.status(404).json({
          success: false,
          msg: "resource not found",
        });
      }
      res.status(200).json({
        success: true,
        product,
        msg: "product deleted",
      });
    } catch (error) {
      if (error.type === "CASTERROR") console.log("casterror");
    }
  }
  // switch (METHOD) {
  //     case "GET":
  //         {
  //         }
  //         break;
  //     case "PUT":
  //         {
  //             const products = await Product.find();

  //             if (!products) {
  //                 return res.status(404).json({
  //                     success: false,
  //                     msg: "resources not found",
  //                 });
  //             }

  //             res.status(200).json({
  //                 success: true,
  //                 products,
  //                 msg: "products found",
  //             });
  //         }
  //         break;
  //     case "POST":
  //         {
  //         }
  //         break;

  //     default:
  //         res.status(400).json({
  //             success: false,
  //             msg: "invalid method",
  //         });
  //         break;
  // }
};
export default connectMongo(handler);
