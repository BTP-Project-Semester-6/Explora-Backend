const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"] || req.headers["x-access-token"];
    // console.log(req.headers["x-auth-token"]);
    if (!token) {
      console.log(req.headers["x-auth-token"]);
      return res.json({ status: "Failed", errors: "Authentication Failed" });
    } else {
      const decodedToken = jwt.verify(token, process.env.JWT_secret_token);
      req.user = decodedToken;
      next();
    }
  } catch (err) {
    // console.log(err);
    return res.json({ status: "Falied", errors: "Authentication Failed" });
  }
};
