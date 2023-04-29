import mongoose, { mongo } from "mongoose";

const AddressSchema = mongoose.Schema(
    {
        street_address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        zip: { type: String },
        user: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose?.models?.Address || mongoose.model("Address", AddressSchema);
