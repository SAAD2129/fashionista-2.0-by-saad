import jsonWeb from "jsonwebtoken";
const isAuthenticated = (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    try {
      const data = jsonWeb.verify(token, "iamsecret");
      // console.log(data)
      if (data) req.user = data.user;
    } catch (error) {
      return res.status(401).json({
        success: false,
        msg: error.message,
      });
    }
  } else {
    res.status(401).json({
      success: false,
      msg: "token not found",
    });
  }
};

export default isAuthenticated;
