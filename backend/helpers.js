const sql = require('./networkutil');
const isemail = require('isemail');

module.exports = {
    FieldCheck : async function(connection, username, email, password, accessCode){
        let params = {
            "username":{
               "valid":true,
               "message":[]
            },
            "email":{
               "valid":true,
               "message":[]
            },
            "password":{
               "valid":true,
               "message":[]
            },
            "accessCode":{
               "valid":true,
               "message":[]
            },
            "valid":true
        }
        if((await sql.FieldExists(connection, "username", username, "users"))){
            params.valid = false;
            params.username.valid = false;
            params.username.message.push("Username taken.");
        }
        if(username.length == 0){
            params.valid = false;
            params.username.valid = false;
            params.username.message.push("Username cannot be empty.");
        }
        if((await sql.FieldExists(connection, "email", email, "users"))){
            params.valid = false;
            params.email.valid = false;
            params.email.message.push("Email taken.");
        }
        if(!isemail.validate(email)){
            params.valid = false;
            params.email.valid = false;
            params.email.message.push("Invalid email.");
        }

        if(password.length == 0){
            params.valid = false;
            params.password.valid = false;
            params.password.message.push("Password cannot be empty.");
        }

        if(!(await sql.AccessCodeValid(connection, accessCode)) || accessCode.length == 0){
            params.valid = false;
            params.accessCode.valid = false;
            params.accessCode.message.push("Access code invalid.");
        }
        return params;
    }
}