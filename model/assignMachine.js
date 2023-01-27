import pool from "../lib/dbConnect.js"

export default {
    GetAll:(callback) => {
        pool.query("SELECT * FROM assign_machine", callback);
    },
    GetByMachineId:(id, callback) => {
        pool.query("SELECT * FROM assign_machine WHERE machine_id = ?", [id], callback);
    },
    Create:(assignMachine, callback) => {
        pool.query("INSERT INTO assign_machine SET ?", assignMachine, callback);
    },
    Update:(id, assignMachine, callback) => {
        pool.query("UPDATE assign_machine SET ? WHERE machine_id = ?", [assignMachine, id], callback);
    },
    Delete:(id, callback) => {
        pool.query("DELETE FROM assign_machine WHERE machine_id = ?", [id], callback);
    }
}
