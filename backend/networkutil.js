const mysql = require('mysql2/promise');
const credentials = require("./constants");

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

    Register: async function (connection, username, email, accessCode, password, session){
        await connection.execute('INSERT INTO users (userID, username, email, access_code, password, session) VALUES (NULL, ?, ?, ?, ?, ?)', [username, email, accessCode, password, session]);
        return session;
    },

    FieldExists: async function (connection, field, value, table){
        let [rows, fields] = await connection.query('SELECT '+field+' FROM '+table+' WHERE '+field+'= ?', [value]);
        return (rows.length > 0);
    },

    RemoveAccessCode: async function(connection, accessCode){
        await connection.query('UPDATE access_codes SET valid=0 WHERE access_code = ? LIMIT 1', [accessCode]);
    },

    AccessCodeValid: async function(connection, accessCode){
        let [rows, fields] = await connection.query('SELECT access_code FROM access_codes WHERE access_code = ? AND valid = 1', [accessCode]);
        return (rows.length > 0);
    },

    GetUserWithKey: async function(connection, key){
        let [rows, fields] = await connection.query('SELECT * FROM users WHERE email = ? OR username = ?', [key, key]);
	console.log(rows);
        return rows[0];
    },

    ChangeSession: async function(connection, userID, session){
        await connection.query('UPDATE users SET session = ? WHERE userID = ? LIMIT 1', [session, userID]);
    },

    InsertPage: async function(connection, userID, username, name, body){
        await connection.query('INSERT INTO pages (pageID, userID, name, author, body) VALUES (NULL, ?, ?, ?, ?)', [userID, name, username, body]);
    },

    CreateAccessCode: async function(connection, accessCode){
        await connection.query('INSERT INTO access_codes(access_code, valid) VALUES (?, 1)', [accessCode]);
    },

    GetUserPages: async function (connection, userID){
        let [results, fields] = await connection.query('SELECT * from pages WHERE userID = ?', [userID]);
        return results;
    }


};
