const jwt = require("jsonwebtoken");
const Profile = require("../model/profile");

exports.authenticateJWT = async (req, res, next) => {
  const reqToken = req.headers.token;
  if (reqToken) {
    jwt.verify(reqToken, "fahim2204", async (err) => {
      if (err) {
        return res.status(403).send(err);
      }
      const _user = await Profile.findOne({ token: reqToken });
      if (_user) {
        req.authUser = _user;
      } else {
        return res.status(404).send({
          message: "Provide a valid token",
        });
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
