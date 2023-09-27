var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "gestionrov"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Conexión exitosa");
});
module.exports = con;