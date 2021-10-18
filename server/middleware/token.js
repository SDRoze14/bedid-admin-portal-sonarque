const JWT = require("jsonwebtoken");
const Config = require("../config");

const UserTokenModel = require("../model/userToken");

module.exports = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["access-token"];
  // decode token
  if (token) {
    // verifies secret and checks exp
    JWT.verify(token, Config.secret, async function(err, decoded) {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized access."
        });
      }
      const userToken = await UserTokenModel.findOne()
        .where("token.token")
        .equals(token)
        .exec();
      if (userToken) {
        req.user = userToken.user;
        req.token = userToken.token;
        next();
      } else {
        return res.status(403).send({
          status: 403,
          message: "You has logout."
        });
      }
    });
  } else {
    return res.status(403).send({
      status: 403,
      message: "No token provided."
    });
  }
};
