import connectMongo from "@/middlewares/connectMongo";
import isAuthenticated from "@/middlewares/isAuthenticated";
import Product from "@/models/Product";
import Review from "@/models/Review";
const handler = async (req, res) => {
  if (req.method === "POST") {
    isAuthenticated(req, res);
    try {
      let { product_id } = req.headers;
      let product = await Product.findById(product_id);
      if (!product) {
        return res.status(400).json({
          success: false,
          msg: "no product found",
        });
      }
      console.log(typeof( req.body))
      const {comment} = req.body
      console.log(comment)
      const review = await Review.create({
        comment: req.body.comment,
        username: req.user.username,
        user_id: req.user._id,
        rating: req.body.rating,
        email: req.user.email,
        product_id,
      });
      product.noOfReviews++;
      product.ratings += req.body.rating;
      product.ratings /= product.noOfReviews;
      await product.save();
      const reviews = await Review.find({ product_id });
      return res.status(201).json({
        success: true,
        msg: "review added successfully",
        product,
        reviews,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: error.message,
      });
    }
  } else if (req.method === "GET") {
    try {
      let { product_id } = req.headers;
      let reviews = await Review.find({ product_id });
      if (!reviews) {
        return res.status(400).json({
          success: false,
          msg: "no reviews found",
        });
      }
      return res.status(201).json({
        success: true,
        msg: "reviews found successfully",
        reviews,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: error.message,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      msg: "invalid method",
    });
  }
};
export default connectMongo(handler);
