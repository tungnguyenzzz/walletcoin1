var mysql = require('mysql2');
const dbquery = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'walletcoin'
});

export default dbquery;