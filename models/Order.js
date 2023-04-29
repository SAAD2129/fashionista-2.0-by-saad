import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
    {
        ordered_by: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        TXN_ID: {
            type: String,
        },
        products: { type: Object, required: true },
        totalprice: {
            type: Number,
            required: true,
        },
        address: {
            type: Object,
            required: true,
        },
        payment_status: {
            type: String,
            default: "pending",
        },
        order_status: {
            type: String,
            default: "pending",
        },
        cancelled: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose?.models?.Order || mongoose.model("Order", OrderSchema);
