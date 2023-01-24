import Machine from "../../../model/machine";
import Auth from "../../../middleware/auth";

export default async (req, res) => {
  const { machineId } = req.query;
  const { method } = req;

  switch (method) {
    case "GET":
        Auth.validateToken(req, res, () => {
        Machine.GetByMachineId(machineId, (err, data) => {
          err ? res.status(500).send(err) : res.status(200).send(data);
        });
      });
      break;
    case "PUT":
      Machine.Update(machineId, req.body, (err, data) => {
        err ? res.status(500).send(err) : res.status(200).send(data);
      });
      break;
    case "DELETE":
      Machine.Delete(machineId, (err, data) => {
        err ? res.status(500).send(err) : res.status(200).send(data);
      });
      break;
    default:
      res.status(405).json({ error: "Bad Method Called!!" });
      break;
  }
};
