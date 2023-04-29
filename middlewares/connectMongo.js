import mongoose, { mongo } from "mongoose";
const connectMongo = (handler) => async (req, res) => {
    if (mongoose.connections[0].readyState) return handler(req, res);
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    return handler(req, res);
};

export default connectMongo;
