var mysql = require("mysql");
const {MYSQL_DB, MYSQL_USERNAME, MYSQL_PASSWORD_SECRET, MYSQL_HOST} = require("./env_vars");

var connectionPool = mysql.createPool({
    connectionLimit : 10,
    host : MYSQL_HOST,
    user : MYSQL_USERNAME,
    password : MYSQL_PASSWORD_SECRET,
    database : MYSQL_DB,
});

module.exports = {connectionPool};