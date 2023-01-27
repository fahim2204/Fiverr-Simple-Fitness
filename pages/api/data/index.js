import Data from "../../../model/data";
import Auth from "../../../middleware/auth";

export default async (req, res) => {
    const { method } = req

    Auth.validateToken(req, res, () => {
        switch (method) {
            case 'GET':
                Data.GetAll((err, data) => {
                    err ? res.status(500).send(err) : res.status(200).send(data);
                });
                break
            case 'POST':
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