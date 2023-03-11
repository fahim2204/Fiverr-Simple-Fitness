import Data from "../../../../../model/data";
import Auth from "../../../../../middleware/auth";
import {
  changeObjArrToCamel,
  changeObjToSnake,
} from "../../../../../lib/caseChange";

export default async (req, res) => {
  const { machineId } = req.query;
  const { method } = req;

  Auth.validateToken(req, res, () => {
    switch (method) {
      case "POST":
        function makeDataLableValStructure(data) {
          let result = {};
          if (data.length < 1) {
            return data;
          }
          const objectWithMostKeys = data.reduce((prev, current) => {
            return Object.keys(prev.sensorData).length >
              Object.keys(current.sensorData).length
              ? prev
              : current;
          });
          const adf = []
          data.forEach((item) => {
            Object.keys(objectWithMostKeys.sensorData).forEach((key) => {
              if(result[key] === undefined){
                result[key] = [];
              }
              if (!result[key]) {
                result[key] = {
                  label: [],
                  val: [],
                };
              }
              // result[key].push(item.createdAt.toISOString().slice(0, -5));
              // result[key].push(item.sensorData[key]);
              const temp = [];
              // console.log("item.createdAt",item.createdAt)
              // console.log("item.createdAt",item.createdAt.getTime())
              // console.log("India.item.createdAt",new Date(item.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })).getTime())
              // console.log("India.item.createdAt",new Date(item.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })))
              // console.log("India.item.createdAt",item.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
              temp.push(item.createdAt.getTime());
              temp.push(parseFloat(item.sensorData[key]));
              result[key].push(temp.sort((a, b) => a[0] - b[0]));

              // result[key].val.push(item.sensorData[key]);
            });
          });

          return result;
        }

        //For Table Data Structure
        function makeDataDateStructure(data) {
          if (data.length < 1) {
            return data;
          }
          const objectWithMostKeys = data.reduce((prev, current) => {
            return Object.keys(prev.sensorData).length >
              Object.keys(current.sensorData).length
              ? prev
              : current;
          });
          const sensorDataKeys = Object.keys(objectWithMostKeys.sensorData);

          return data.map((datum) => {
            const sensorData = datum.sensorData;
            const datumWithSensorData = { createdAt: new Date(datum.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })) };

            for (const key of sensorDataKeys) {
              datumWithSensorData[key] = sensorData[key] || 0;
            }

            return datumWithSensorData;
          });
        }

        function convertSensorData(data) {
          const result = [];
          data.forEach((item) => {
            const { createdAt, sensorData } = item;
            for (const [title, value] of Object.entries(sensorData)) {
              result.push({ createdAt, title, value });
            }
          });
          return result;
        }

        Data.GetByDataByMachineIdFromTo(
          machineId,
          req.body.from,
          req.body.to,
          (err, data) => {
            err
              ? res.status(500).send(err)
              : res
                  .status(200)
                  .send(
                    req.body.type === "table"
                      ? makeDataDateStructure(changeObjArrToCamel(data))
                      : makeDataLableValStructure(changeObjArrToCamel(data))
                  );
          }
        );
        break;
      default:
        res.status(405).json({ error: "Bad Method Called!!" });
        break;
    }
  });
};
