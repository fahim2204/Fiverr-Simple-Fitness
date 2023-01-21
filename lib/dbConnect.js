const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'your_host',
  user: 'your_user',
  password: 'your_password',
  database: 'your_database'
});
connection.connect();


module.exports = connection;
