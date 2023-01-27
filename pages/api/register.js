import User from "../../model/user";
import { hash } from "bcryptjs";
import { registerValidate } from "../../lib/validate";
import { changeObjToSnake } from "../../lib/caseChange";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      // Server Side Validation Of Data
      const errors = registerValidate(req.body);
      if (Object.keys(errors).length !== 0) {
        return res.status(422).json({ errors });
      } else {
        User.GetByUsername(req.body.username, async (err, data) => {
          if (data.length !== 0) {
            errors.username = "Username already exists";
            return res.status(422).json({ errors });
          } else {
            //Hashing Password
            req.body.password = await hash(req.body.password, 12);

            // Modify Form Data
            req.body.createdAt = new Date();
            req.body.updatedAt = new Date();
            req.body.status = 1;
            delete req.body.confirmPassword;

            // Change All key Value to Snake Case For DB
            req.body = changeObjToSnake(req.body);

            // Process Register User
            User.RegisterUser(req.body, (err, data) => {
              err
                ? res.status(400).send(err)
                : res.status(201).json({ success: true, msg: "Registration success!!" });
            });
          }
        });
      }
      break;
    default:
      res.status(405).json({ error: "Bad Method Called!!" });
      break;
  }
};
