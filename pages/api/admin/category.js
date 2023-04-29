import connectMongo from "@/middlewares/connectMongo";
import Category from "@/models/Category";
import Product from "@/models/Product";
import jsonWeb from "jsonwebtoken";
const handler = async (req, res) => {
  let METHOD = req.method;
  switch (METHOD) {
    case "POST":
      {
        try {
          const { token } = req.headers;
          let data = jsonWeb.verify(token, "iamsecret");
          let id = data.user._id;
          console.log(req.body, id);
          const category = await Category.create({
            name: req.body.name,
            plural:req.body.plural,
            createdBy: id,
          });
          if (category) {
            return res.status(200).json({
              success: true,
              category,
              msg: "category added",
            });
          }
        } catch (error) {
          res.status(500).json({
            success: false,
            msg: error.message,
          });
        }
      }
      break;
    case "DELETE":
      {
        try {
          const { category_id } = req.headers;
          const category = await Category.findByIdAndDelete(category_id)
          if (category) {
            return res.status(200).json({
              success: true,
              category,
              msg: "category deleted",
            });
          }
          return res.status(200).json({
            success: false,
            msg: "category not found",
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            msg: error.message,
          });
        }
      }
      break;
    case "GET":
      {
        try {
          const categories = await Category.find();
          console.log(categories)
          if (!categories) {
            return res.status(404).json({
              success: false,
              msg: "categories not found",
            });
          }
          return res.status(200).json({
            success: true,
            categories,
            msg: "categories found",
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            msg: error.message,
          });
        }
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
