import connectMongo from "@/middlewares/connectMongo";
import Address from "@/models/Address";
import jsonWeb from "jsonwebtoken";
const handler = async (req, res) => {
    const METHOD = req.method;
    if (METHOD === "GET") {
        try {
            const { token } = req.headers;
            let data = jsonWeb.verify(token, "iamsecret");
            let id = data.user._id;
            const addresses = await Address.find({ user: id });
            
            if (!addresses) {
                return res.status(400).json({
                    success: false,
                    msg: "no addresses found",
                });
            }
            return res.status(200).json({
                success: true,
                msg: "addresses found",
                addresses,
            });
        } catch (error) {
            return res.status(500).json({
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
