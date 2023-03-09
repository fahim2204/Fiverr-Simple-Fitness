const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'fahimfaisal.net',
  user: 'fahimfai_fahim',
  password: 'KoolMan@#98',
  database: 'fahimfai_logbyte'
});



setInterval(()=>{
  updateOfflineDevices()
},300000)
// Update the status of the devices that haven't been active for the last 5 minutes
const updateOfflineDevices = () => {
  const currentTime = new Date();
  const fiveMinutesAgo = new Date(currentTime.getTime() - 5 * 60 * 1000);

  pool.query("UPDATE machine SET status = ? WHERE updated_at < ?", [2, fiveMinutesAgo], (error, results, fields) => {
    if (error) throw error;
    console.log(`Updated ${results.affectedRows} device(s)`);
  });
};



module.exports = pool;
