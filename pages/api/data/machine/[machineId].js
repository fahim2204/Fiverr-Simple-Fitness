import Data from "../../../../model/data";
import Auth from "../../../../middleware/auth";
import { changeObjArrToCamel, changeObjToSnake } from "../../../../lib/caseChange";

export default async (req, res) => {
  const { machineId } = req.query;
  const { method } = req;

  Auth.validateToken(req, res, () => {
    switch (method) {
      case "GET":
        Data.GetByDataByMachineId(machineId, (err, data) => {
          err ? res.status(500).send(err) : res.status(200).send(changeObjArrToCamel(data));
        });
        break;
      default:
        res.status(405).json({ error: "Bad Method Called!!" });
        break;
    }
  });
};
