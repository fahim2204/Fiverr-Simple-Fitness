import Data from "../../../../../model/data";
import Auth from "../../../../../middleware/auth";
import { changeObjArrToCamel, changeObjToSnake } from "../../../../../lib/caseChange";

export default async (req, res) => {
  const { machineId } = req.query;
  const { method } = req;

  Auth.validateToken(req, res, () => {
    switch (method) {
      case "POST":
        function makeDataLableValStructure(data) {
          let result = {};

          data.forEach(item => {
            Object.keys(item.sensorData).forEach(key => {
              if (!result[key]) {
                result[key] = {
                  label: [],
                  val: []
                };
              }
              result[key].label.push(item.createdAt);
              result[key].val.push(item.sensorData[key]);
            });
          });

          return result;
        }
        Data.GetByDataByMachineIdFromTo(machineId, req.body.from, req.body.to, (err, data) => {
          err ? res.status(500).send(err) : res.status(200).send(makeDataLableValStructure(changeObjArrToCamel(data)));
        });
        break;
      default:
        res.status(405).json({ error: "Bad Method Called!!" });
        break;
    }
  });
};

