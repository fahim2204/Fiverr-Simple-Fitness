const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'fahimfaisal.net',
  user: 'fahimfai_fahim',
  password: 'KoolMan@#98',
  database: 'fahimfai_logbyte'
});

module.exports = pool;
