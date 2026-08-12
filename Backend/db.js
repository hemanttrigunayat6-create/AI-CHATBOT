const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((error) => {

    if (error) {
        console.error("Database Connection Failed:", error.message);
        return;
    }

    console.log("✅ MySQL Connected Successfully");

});

module.exports = db;