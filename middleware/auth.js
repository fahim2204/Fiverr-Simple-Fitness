import pool from "../lib/dbConnect.js"

exports.validateToken = (req, res, next) => {
    console.log("validateToken");
    next();
}