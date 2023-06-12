const { sendResponse } = require("../Helper/helper");
const jwt = require("jsonwebtoken");

const AuthController = {
  Protected: async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, process.env.SECURE_KEY, (err, decoded) => {
        if (err) {
          res.send(sendResponse(false, null, "Unauthorized")).status(403);
        } else {
          console.log(decoded);
          next();
        }
      });
    } else {
      res.send(sendResponse(false, null, "Unauthorized")).status(403);
    }
  },

  adminProtected: async (req, res, next) => {
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    jwt.verify(token, process.env.SECURE_KEY, (err, decoded) => {
      if (err) {
        res.send(sendResponse(false, null, "Unauthorized")).status(403);
      } else {
        if (decoded._doc.isAdmin) {
          next();
        } else {
          res
            .send(sendResponse(false, null, "You Have Rights for this Action"))
            .status(403);
        }
      }
    });
  },
};

module.exports = AuthController;
