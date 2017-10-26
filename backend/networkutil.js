let mysql = require('mysql');
let credentials = require("./constants");
let hash = require('password-hash');
let uuid = require('uuid/v4')
module.exports = {
    SQLConnect: function (testing) {
        return mysql.createConnection({
            host: credentials.SQLURL,
            user: credentials.SQLUSER,
            password: credentials.SQLPASS,
            database: (testing ? credentials.TEST_DBNAME : credentials.DBNAME)
        });
    },

    GetPage: function (connection, pageID, userID, callback) {
        connection.query('SELECT name, author, body FROM pages WHERE pageID = ? AND userID = ?', [pageID, userID], callback);
    },

    GetBook: function (connection, offset, count, callback){
        connection.query('SELECT name, author, body, pageID, userID FROM pages LIMIT ?, ?', [offset * count, count], callback);
    },

    Register: function (connection, username, email, accessCode, password, callback){
        password = hash.generate(password);
        session = uuid();
        connection.query('INSERT INTO users (userID, username, email, access_code, password, session) VALUES (NULL, ?, ?, ?, ?, ?)', [username, email, accessCode, password, session], callback);
    }
};