import pool from "../lib/dbConnect.js"

export default {
    GetAll:(callback) => {
        pool.query("SELECT * FROM machine", callback);
    },
    GetByMachineId:(id, callback) => {
        pool.query("SELECT * FROM machine WHERE machine_id = ?", [id], callback);
    },
    GetByMachineMac:(mac, callback) => {
        pool.query("SELECT * FROM machine WHERE machine_mac = ?", [mac], callback);
    },
    Create:(machine, callback) => {
        pool.query("INSERT INTO machine SET ?", machine, callback);
    },
    Update:(id, machine, callback) => {
        pool.query("UPDATE machine SET ? WHERE machine_id = ?", [machine, id], callback);
    },
    Delete:(id, callback) => {
        pool.query("DELETE FROM machine WHERE machine_id = ?", [id], callback);
    }
}
