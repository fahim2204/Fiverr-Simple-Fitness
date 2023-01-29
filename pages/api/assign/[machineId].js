import AssignMachine from "../../../model/assignMachine";
import Auth from "../../../middleware/auth";
import { changeObjToCamel, changeObjArrToCamel, changeObjToSnake } from "../../../lib/caseChange";

export default async (req, res) => {
  const { machineId } = req.query;
  const { method } = req;

  Auth.validateToken(req, res, () => {
    switch (method) {
      case "GET":
        return res.status(501);
        AssignMachine.GetByUserToken(userId, (err, data) => {
          err ? res.status(500).send(err) : res.status(200).send(changeObjArrToCamel(data));
        });
        break;
      case "PUT":
        return res.status(501);
        // Change All key Value to Snake Case For DB
        req.body.updatedAt = new Date()
        req.body.sensorData = JSON.stringify(req.body.sensorData)

        req.body = changeObjToSnake(req.body);


        AssignMachine.Update(dataId, req.body, (err, data) => {
          err ? res.status(500).send(err) : res.status(200).send(data);
        });
        break;
      case "DELETE":
        AssignMachine.DeleteWithUserMachine(req.authUser.id, machineId, (err, data) => {
          err ? res.status(500).send(err) : res.status(200).send(data);
        });
        break;
      default:
        res.status(405).json({ error: "Bad Method Called!!" });
        break;
    }
  });
};
