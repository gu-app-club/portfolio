const mysql = require('mysql2/promise');
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
        });
    },

    GetPage: async function (connection, pageID, userID) {
        const[results, fields] = await connection.query('SELECT name, author, body FROM pages WHERE pageID = ? AND userID = ?', [pageID, userID]);
        return results[0];
    },

    GetBook: async function (connection, offset, count){
        const[results, fields] = await connection.query('SELECT name, author, body, pageID, userID FROM pages LIMIT ?, ?', [offset * count, count]);
        return {pages: results, count: count, offset: offset, length: results.length};
    },

    Register: async function (connection, username, email, accessCode, password){
        password = hash.generate(password);
        session = uuid();
        await connection.execute('INSERT INTO users (userID, username, email, access_code, password, session) VALUES (NULL, ?, ?, ?, ?, ?)', [username, email, accessCode, password, session]);
    },

    FieldExists: async function (connection, field, value, table){
        let [rows, fields] = await connection.query('`SELECT '+field+' FROM '+table+' WHERE '+field+'= ?', value);
        return (rows.length > 0);
    }
};