import Machine from "../../../model/machine";

export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            Machine.GetAll((err, data) => {
                err ? res.status(500).send(err) : res.status(200).send(data);
            });
            break
        case 'POST':
            Machine.Create(req.body,(err, data) => {
                err ? res.status(500).send(err) : res.status(200).send(data);
            });
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}