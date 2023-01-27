import Data from "../../../model/data";
import Auth from "../../../middleware/auth";
import { changeObjToCamel, changeObjToSnake } from "../../../lib/caseChange";

export default async (req, res) => {
  const { dataId } = req.query;
  const { method } = req;

  Auth.validateToken(req, res, () => {
    switch (method) {
      case "GET":
        Data.GetByDataId(dataId, (err, data) => {
          err ? res.status(500).send(err) : res.status(200).send(changeObjToCamel(data[0]));
        });
        break;
      case "PUT":
        // Change All key Value to Snake Case For DB
        req.body.updatedAt = new Date()
        req.body.sensorData = JSON.stringify(req.body.sensorData)

        req.body = changeObjToSnake(req.body);
        

        Data.Update(dataId, req.body, (err, data) => {
          err ? res.status(500).send(err) : res.status(200).send(data);
        });
        break;
      case "DELETE":
        Data.Delete(dataId, (err, data) => {
          err ? res.status(500).send(err) : res.status(200).send(data);
        });
        break;
      default:
        res.status(405).json({ error: "Bad Method Called!!" });
        break;
    }
  });
};
