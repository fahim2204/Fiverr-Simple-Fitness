import pool from "../lib/dbConnect.js"

export default {
    GetAll:(callback) => {
        pool.query("SELECT * FROM data", callback);
    },
    GetByMachineId:(id, callback) => {
        pool.query("SELECT * FROM data WHERE id = ?", [id], callback);
    },
    Create:(data, callback) => {
        pool.query("INSERT INTO data SET ?", data, callback);
    },
    Update:(id, data, callback) => {
        pool.query("UPDATE data SET ? WHERE id = ?", [data, id], callback);
    },
    Delete:(id, callback) => {
        pool.query("DELETE FROM data WHERE id = ?", [id], callback);
    }
}
