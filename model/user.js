import pool from "../lib/dbConnect.js"

export default {
    GetAll:(callback) => {
        pool.query("SELECT * FROM user", callback);
    },
    GetByUserId:(id, callback) => {
        pool.query("SELECT * FROM user WHERE id = ?", [id], callback);
    },
    GetByUsername:(username, callback) => {
        pool.query("SELECT * FROM user WHERE username = ?", [username], callback);
    },
    GetByToken:(token, callback) => {
        pool.query("SELECT * FROM user WHERE token = ?", [token], callback);
    },
    RegisterUser:(user, callback) => {
        pool.query("INSERT INTO user SET ?", user, callback);
    },
    // Create:(user, callback) => {
    //     pool.query("INSERT INTO user SET ?", user, callback);
    // },
    Update:(id, user, callback) => {
        pool.query("UPDATE user SET ? WHERE id = ?", [user, id], callback);
    },
    Delete:(id, callback) => {
        pool.query("DELETE FROM user WHERE id = ?", [id], callback);
    }
}
