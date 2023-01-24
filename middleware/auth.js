import User from "../model/user";
// const User = require("../model/user");
const jwt = require("jsonwebtoken");
// Check if the Token is expired
export default {
  validateToken: (req, res, next) => {
    // console.log("first")
    // return res.status(404).send();
    const reqToken = req.headers.token;
    if (reqToken) {
      jwt.verify(reqToken, "2204", async (err) => {
        if (err) {
          return res.status(403).send(err);
        }
        User.GetByToken(req.body.username, async (err, user) => {
          if (!err) {
            if (user.length === 0) {
              return res.status(401).json({ message: "Provide a valid token" });
            } else {
              req.authUser = user[0];
            }
          }
        });
        next();
      });
    } else {
      res.status(401).send();
    }
  },
};
// module.exports = validateToken;
