import Machine from "../../../model/machine";
import Auth from "../../../middleware/auth";
import { changeObjArrToCamel, changeObjToSnake } from "../../../lib/caseChange";
import { machineValidate } from "../../../lib/validate";

export default async (req, res) => {
  const { method } = req;

  Auth.validateToken(req, res, () => {
    switch (method) {
      case "GET":
        Machine.GetAll((err, data) => {
          err
            ? res.status(500).send(err)
            : res.status(200).send(changeObjArrToCamel(data));
        });
        break;
      case "POST":
        // Server Side Validation Of Data
        const errors = machineValidate(req.body);
        if (Object.keys(errors).length !== 0) {
          return res.status(400).json({ errors });
        }

        req.body.status = 1;
        req.body.createdAt = new Date();
        req.body.updatedAt = new Date();

        // Change All key Value to Snake Case For DB
        req.body = changeObjToSnake(req.body);

        Machine.Create(req.body, (err, data) => {
          err ? res.status(500).send(err) : res.status(201).send(data);
        });
        break;
      default:
        res.status(405).json({ error: "Bad Method Called!!" });
        break;
    }
  });
};
