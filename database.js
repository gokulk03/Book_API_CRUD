const mysql = require('mysql2/promise')
const mysqlPool = mysql.createPool({
    host:'localhost',
    password:'Gokul@003',
    database:'demodatabase',
    user:'root'
});

module.exports = mysqlPool;