// import mongoose from "mongoose";
const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    reviews: [
      {
        comment: {
          type: String,
          required: true,
        },
        rating:{
          type: Number,
          required: true,
        },
        user_id: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
    noOfReviews: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    colors: [
      {
        inStock: {
          type: Boolean,
        },
        color: {
          type: String,
        },
      },
    ],
    sizes: [
      {
        inStock: {
          type: Boolean,
        },
        size: {
          type: String,
        },
      },
    ],
    images: [
      {
        public_id: { type: String },
        secret_url: { type: String },
      },
    ],
    createdBy: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);
// mongoose.models = {};/
// const Product =
export default mongoose?.models?.Product ||
  mongoose.model("Product", ProductSchema);
// export default mongoose.models.Order ||
//     mongoose.model("Order", OrderSchema);
