const mysql = require('mysql2');
const credentials = require("./constants");
const hash = require('password-hash');
const uuid = require('uuid/v4')
module.exports = {
    SQLConnect: async function (testing) {
        return await mysql.createConnection({
            host: credentials.SQLURL,
            user: credentials.SQLUSER,
            password: credentials.SQLPASS,
            database: (testing ? credentials.TEST_DBNAME : credentials.DBNAME)
        }).catch(function(error){
            throw error;
        });
    },

    GetPage: async function (connection, pageID, userID) {
        let result = await connection.execute('SELECT name, author, body FROM pages WHERE pageID = ? AND userID = ?', [pageID, userID]).catch(function(error){
            throw error;
        });
        return result[0];
    },

    GetBook: async function (connection, offset, count){
        let result = connection.execute('SELECT name, author, body, pageID, userID FROM pages LIMIT ?, ?', [offset * count, count]);
        return {pages: results, count: count, offset: offset, length: results.length};
    },

    Register: async function (connection, username, email, accessCode, password){
        password = hash.generate(password);
        session = uuid();
        await connection.execute('INSERT INTO users (userID, username, email, access_code, password, session) VALUES (NULL, ?, ?, ?, ?, ?)', [username, email, accessCode, password, session]);
    }
};