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
          if(data.length < 1) {
            return data;
          }
          const objectWithMostKeys = data.reduce((prev, current) => {
            return Object.keys(prev.sensorData).length > Object.keys(current.sensorData).length ? prev : current;
          });
          data.forEach(item => {
            Object.keys(objectWithMostKeys.sensorData).forEach(key => {
              if (!result[key]) {
                result[key] = {
                  label: [],
                  val: []
                };
              }
              result[key].label.push(item.createdAt.toISOString().slice(0, -5));
              result[key].val.push(item.sensorData[key]);
            });
          });

          return result;
        }
        function convertSensorData(data) {
          const result = [];
          data.forEach(item => {
            const {createdAt, sensorData} = item;
            for (const [title, value] of Object.entries(sensorData)) {
              result.push({createdAt, title, value});
            }
          });
          return result;
        }
        
        Data.GetByDataByMachineIdFromTo(machineId, req.body.from, req.body.to, (err, data) => {
          err ? res.status(500).send(err) : res.status(200).send(req.body.type==="table"?convertSensorData(changeObjArrToCamel(data)):makeDataLableValStructure(changeObjArrToCamel(data)));
        });
        break;
      default:
        res.status(405).json({ error: "Bad Method Called!!" });
        break;
    }
  });
};

