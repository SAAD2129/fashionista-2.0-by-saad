import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.Review ||
  mongoose.model("Review", ReviewSchema);
