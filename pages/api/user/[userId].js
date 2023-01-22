import User from "../../../model/user";
import { changeObjToCamel,changeObjToSnake } from "../../../lib/caseChange";


export default async (req, res) => {
    const { userId } = req.query
    const { method } = req
    // validateToken(req, res, async () => {
    //     await User.findOne({username}).select('-password').select('-token').then((x) => { 
    //         // x.password = undefined;
    //         return res.status(200).json({ success: true, data: x }) }
    //     ).catch(e => {
    //         return res.status(500).json({ success: false, data: e })
    //     })
    // })
    switch (method) {
        case 'GET':
            User.GetByUserId(userId, (err, data) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    //Remove Password & Token
                    const newData = data.map(item => {
                        const { password, token, ...rest } = item;
                        return rest;
                    });
                    res.status(200).send(changeObjToCamel(newData[0]));
                }
            });
            break
        case 'PUT':
            User.Update(userId, req.body, (err, data) => {
                req
                err ? res.status(500).send(err) : res.status(200).send(data);
            });
            break
        case 'DELETE':
            User.Delete(userId, (err, data) => {
                err ? res.status(500).send(err) : res.status(200).send(data);
            });
            break
        default:
            res.status(405).json({ error: "Bad Method Called!!" })
            break
    }
}