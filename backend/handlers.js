const express = require('express');
const router = express.Router();
const sql = require("./networkutil")
const helpers = require('./helpers')
const hash = require('password-hash');
const uuid = require('uuid/v4')
const sillyname = require('sillyname');
const constants = require('./constants');

//Page Handler
router.get('/pages/:pageID/users/:userID', async function (req, res, next) {
  let connection = await sql.SQLConnect();
  let response = await sql.GetPage(connection, req.params.pageID, req.params.userID);
  res.send(response);
});

//Book Handler
router.get('/pages/:count/:offset', async function (req, res, next) {
  let offset = parseInt(req.params.offset);
  let count = parseInt(req.params.count);
  let connection = await sql.SQLConnect();
  let response = await sql.GetBook(connection, offset, count);

  res.send(response);
});

//Register Handler
router.post('/register', async function (req, res, next) {
  let connection = await sql.SQLConnect();
  await sql.CreateAccessCode(connection, 'gumad');  

  let params = await helpers.FieldCheck(connection, req.body.username, req.body.email, req.body.password, req.body.accessCode);
  if(params.valid){
    let password = hash.generate(req.body.password);
    let session = uuid();
    await sql.Register(connection, req.body.username, req.body.email, req.body.accessCode, password, session);
    await sql.RemoveAccessCode(connection, req.body.accessCode);

    res.send({session:session, valid: true})
  }else{
    res.send(params)
  }
  
});

//Login Handler
router.post('/login', async function (req, res, next) {
  let connection = await sql.SQLConnect();
  let user = await sql.GetUserWithKey(connection, req.body.key);
  if(user && hash.verify(req.body.password, user.password)){
    let session = uuid();
    await sql.ChangeSession(connection, user.userID, session);
    res.send({session:session, valid: true});
  }else{
    res.send({valid: false});
  }
});

//Upload Handler
router.post('/pages/new', async function (req, res, next) {
  let connection = await sql.SQLConnect();
  let user = await sql.GetUserWithKey(connection, req.cookies.username);
  if(user && (user.session == req.cookies.session)){
    let session = uuid();
    await sql.InsertPage(connection, user.userID, user.username, req.body.title, req.body.body);
    await sql.ChangeSession(connection, user.userID, session);
    res.send({session:session, valid: true});
  }else{
    res.send({valid: false});
  }
});

//AccessCode Handler
router.get('/access/new', async function (req, res, next) {
  if(constants.ISPROD) return;

  let accessCode = sillyname().split(' ')[0].toLowerCase();
  let connection = await sql.SQLConnect();
  await sql.CreateAccessCode(connection, accessCode);
  res.send({accessCode: accessCode});
});

router.get('/users/:userID', async function (req, res, next){
  let connection = await sql.SQLConnect();
  let response = await sql.GetUserPages(connection, req.params.userID);
  res.send(response);
});

module.exports = router;
