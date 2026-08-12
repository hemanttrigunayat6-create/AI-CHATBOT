require("dotenv").config();
const mysql = require("mysql2");

// Create MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "chatbot"
});

// Connect to database
db.connect((error) => {

    if (error) {
        console.error("Database Connection Failed:", error.message);
        return;
    }

    console.log("✅ MySQL Connected Successfully");

});

module.exports = db;