import Machine from "../../../model/machine";
import Auth from "../../../middleware/auth";
import { machineValidate } from "../../../lib/validate";
import { changeObjToCamel, changeObjToSnake } from "../../../lib/caseChange";

export default async (req, res) => {
  const { machineId } = req.query;
  const { method } = req;

  Auth.validateToken(req, res, () => {
    switch (method) {
      case "GET":
        Machine.GetByMachineId(machineId, (err, data) => {
          err ? res.status(500).send(err) : res.status(200).send(changeObjToCamel(data[0]));
        });
        break;
      case "PUT":
        req.body.updatedAt = new Date()

        // Change All key Value to Snake Case For DB
        req.body = changeObjToSnake(req.body);
        
        Machine.Update(machineId, req.body, (err, data) => {
          err ? res.status(500).send(err) : res.status(200).send(data);
        });
        break;
      case "DELETE":
        Machine.Delete(machineId, (err, data) => {
          err ? res.status(500).send(err) : res.status(200).send(data);
        });
        break;
      default:
        res.status(405).json({ error: "Bad Method Called!!" });
        break;
    }
  });
};
