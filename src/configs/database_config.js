const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "34.101.131.71",
    user: "root",
    password: "wastecreative",
    database: "wastecreative"
});

db.connect(function(error){
    if(error){
        console.error(error);
    } else {
        console.info("Connected to Database");
    }
});

module.exports = db;