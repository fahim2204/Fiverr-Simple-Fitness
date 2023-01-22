import User from "../../../model/user";
import { changeObjArrToCamel } from "../../../lib/caseChange";

export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            User.GetAll((err, data) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    //Remove Password & Token
                    const newData = data.map(item => {
                        const { password, token, ...rest } = item;
                        return rest;
                      });
                    res.status(200).send(changeObjArrToCamel(newData));
                }
            });
            break
        // case 'POST':
        //     User.Create(req.body, (err, data) => {
        //         err ? res.status(500).send(err) : res.status(201).send(data);
        //     });
        //     break
        default:
            res.status(405).json({ error: "Bad Method Called!!" })
            break
    }
}