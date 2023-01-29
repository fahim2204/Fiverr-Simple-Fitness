import AssignMachine from "../../../model/assignMachine";
import Machine from "../../../model/machine";
import Auth from "../../../middleware/auth";
import { changeObjArrToCamel, changeObjToSnake } from "../../../lib/caseChange";
import { machineAssignDataValidate } from "../../../lib/validate";

export default async (req, res) => {
    const { method } = req

    Auth.validateToken(req, res, () => {
        switch (method) {
            case 'GET':
                AssignMachine.GetByUserId(req.authUser.id, (err, data) => {
                    err ? res.status(500).send(err) : res.status(200).send(changeObjArrToCamel(data));
                });
                break
            default:
                res.status(405).json({ error: "Bad Method Called!!" })
                break
        }
    });
}