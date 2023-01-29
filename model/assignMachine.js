import pool from "../lib/dbConnect.js"

export default {
    GetAll:(callback) => {
        pool.query("SELECT * FROM assign_machine", callback);
    },
    GetAllWithMachine:(callback) => {
        pool.query("SELECT assign_machine.*, machine.machine_mac FROM assign_machine JOIN machine ON assign_machine.fk_machine_id = machine.machine_id", callback);
    },
    GetByMachineId:(id, callback) => {
        pool.query("SELECT * FROM assign_machine WHERE fk_machine_id = ?", [id], callback);
    },
    GetByUserId:(id, callback) => {
        pool.query("SELECT assign_machine.fk_machine_id, machine.machine_mac,assign_machine.status FROM assign_machine JOIN machine ON assign_machine.fk_machine_id = machine.machine_id WHERE fk_user_id = ?", [id], callback);
    },
    Create:(assignMachine, callback) => {
        pool.query("INSERT INTO assign_machine SET ?", assignMachine, callback);
    },
    Update:(id, assignMachine, callback) => {
        pool.query("UPDATE assign_machine SET ? WHERE fk_machine_id = ?", [assignMachine, id], callback);
    },
    Delete:(id, callback) => {
        pool.query("DELETE FROM assign_machine WHERE fk_machine_id = ?", [id], callback);
    },
    DeleteWithUserMachine:(userId,machineId, callback) => {
        pool.query("DELETE FROM assign_machine WHERE fk_machine_id = ? AND fk_user_id=?", [machineId,userId], callback);
    }
}
