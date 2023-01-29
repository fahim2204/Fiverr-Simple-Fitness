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
                AssignMachine.GetAllWithMachine((err, data) => {
                    err ? res.status(500).send(err) : res.status(200).send(changeObjArrToCamel(data));
                });
                // AssignMachine.GetAll((err, data) => {
                //     err ? res.status(500).send(err) : res.status(200).send(changeObjArrToCamel(data));
                // });
                break
            case 'POST':
                // Server Side Validation Of Data
                const errors = machineAssignDataValidate(req.body);
                if (Object.keys(errors).length !== 0) {
                    return res.status(400).json({ errors });
                }
                Machine.GetByMachineMac(req.body.machineMac, (err, data) => {
                    if (!err) {
                        if (data.length === 0) {
                            errors.machineMac = "No Device found";
                            return res.status(422).json({errors });
                        } else {
                            req.body.fkUserId = req.authUser.id
                            delete req.body.machineMac
                            req.body.fkMachineId = data[0].machine_id
                            req.body.status = 1
                            req.body.createdAt = new Date()
                            req.body.updatedAt = new Date()

                            // Change All key Value to Snake Case For DB
                            req.body = changeObjToSnake(req.body);

                            AssignMachine.Create(req.body, (err, data) => {
                                if (err) {
                                    // Check If the machine is already assigned
                                    if (err.code === 'ER_DUP_ENTRY') {
                                        errors.machineMac = "Already added";
                                        return res.status(422).json({ errors });
                                    } else {
                                        res.status(500).send(err)
                                    }
                                } else { res.status(201).json({ msg: "success" }); }
                            });

                        }
                    } else {
                        return res.status(400).json({ err });
                    }
                });
                break
            default:
                res.status(405).json({ error: "Bad Method Called!!" })
                break
        }
    });
}