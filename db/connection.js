const mysql = require("mysql2")
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "opz00",
  database: "employee_tracker"
});

connection.connect((error) => {
  if (error) {
    console.log('Error connecting to the MySQL Database');
    return;
  }
  console.log('Connection established sucessfully');
});


module.exports = connection