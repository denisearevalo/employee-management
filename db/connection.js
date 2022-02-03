const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
        host: 'localhost',
        // port:'2001',
        // MySQL username,
        user: 'root',
        password: process.env.MYSQL_PASSWORD,
        database: 'ems_db'
    },
    console.log(`Connected to the system_db database.`)
);

module.exports = db;