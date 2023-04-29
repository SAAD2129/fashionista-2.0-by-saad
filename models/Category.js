import mongoose, { mongo } from "mongoose";

const CategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required:true,
        },
        plural: {
            type: String,
            required: true,
        },
        createdBy: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose?.models?.Category ||
    mongoose.model("Category", CategorySchema);
