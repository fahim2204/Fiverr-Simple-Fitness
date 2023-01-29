import Data from "../../../model/data";
import Auth from "../../../middleware/auth";
import { changeObjArrToCamel, changeObjToSnake } from "../../../lib/caseChange";
import { machineDataValidate } from "../../../lib/validate";

export default async (req, res) => {
    const { method } = req

    Auth.validateToken(req, res, () => {
        switch (method) {
            case 'GET':
                Data.GetAll((err, data) => {
                    err ? res.status(500).send(err) : res.status(200).send(changeObjArrToCamel(data));
                });
                break
            case 'POST':
                // Server Side Validation Of Data
                const errors = machineDataValidate(req.body);
                if (Object.keys(errors).length !== 0) {
                    return res.status(400).json({ errors });
                }
                req.body.status = 1
                // const today = new Date();
                // const yesterday = new Date();
                // yesterday.setDate(today.getDate() - 1);
                // req.body.createdAt = yesterday;
                // req.body.updatedAt = yesterday;
                req.body.createdAt = new Date()
                req.body.updatedAt = new Date()
                req.body.sensorData = JSON.stringify(req.body.sensorData)

                // Change All key Value to Snake Case For DB
                req.body = changeObjToSnake(req.body);

                Data.Create(req.body, (err, data) => {
                    err ? res.status(500).send(err) : res.status(201).send(data);
                });
                break
            default:
                res.status(405).json({ error: "Bad Method Called!!" })
                break
        }
    });
}