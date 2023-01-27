import User from "../../model/user";
import { compare } from "bcryptjs";
const jwt = require("jsonwebtoken");
import { loginValidate, isTokenExpired } from "../../lib/validate";
import { changeObjToSnake } from "../../lib/caseChange";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      // Server Side Validation Of Data
      const errors = loginValidate(req.body);
      if (Object.keys(errors).length !== 0) {
        return res.status(400).json({ errors });
      } else {
        User.GetByUsername(req.body.username, async (err, user) => {
          if (!err) {
            if (user.length === 0) {
              errors.username = "User not found";
              return res.status(401).json({ errors });
            } else {
              //Compare Password
              const checkPass = await compare(req.body.password, user[0].password);

              if (checkPass) {
                const generateJWT = () => {
                  return jwt.sign({ username: user[0].username }, "2204", { expiresIn: '2h' });
                }

                if (user[0].token) {
                  if (isTokenExpired(user[0].token)) {
                    req.body.token = generateJWT()
                  }else{
                    req.body.token = user[0].token
                  }
                }
                else {
                  req.body.token = generateJWT()
                }

                req.body.lastLogin = new Date();
                delete req.body.password;

                // Change All key Value to Snake Case For DB
                req.body = changeObjToSnake(req.body);

                // Process Register User
                User.Update(user[0].id, req.body, (err, data) => {
                  err
                    ? res.status(400).send(err)
                    : res.status(200).json({ success: true, msg: "Login success!!", token: req.body.token });
                });
              } else {
                errors.password = "Password doesn't matched";
                return res.status(401).json({ errors });
              }
            }
          }
          else {
            return res.status(204).send()
          }
        })
      }
      break;
    default:
      res.status(405).json({ error: "Bad Method Called!!" });
      break;
  }
};
