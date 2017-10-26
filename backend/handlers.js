let express = require('express');
let router = express.Router();
let sql = require("./networkutil")

//Page Handler
router.get('/pages/:pageID/users/:userID', async function (req, res, next) {
  let connection = await sql.SQLConnect(false);
  let response = await sql.GetPage(connection, req.params.pageID, req.params.userID);
  res.send(response);
});

//Book Handler
router.get('/pages/:count/:offset', async function (req, res, next) {
  let offset = parseInt(req.params.offset);
  let count = parseInt(req.params.count);
  let connection = await sql.SQLConnect(false);
  let response = await sql.GetBook(connection, offset, count);

  res.send(response);
});

//Register Handler
router.post('/register', async function (req, res, next) {
  let connection = await sql.SQLConnect(false);

  //field check
  await sql.Register(connection, req.body.username, req.body.email, req.body.accessCode, req.body.password);
});

//Login Handler
router.post('/login', function (req, res, next) {
  res.send(req.params)
});

//Upload Handler
router.post('/pages/new', function (req, res, next) {
  res.send(req.params)
});

//Replace Handler
router.post('/pages/replace', function (req, res, next) {
  res.send(req.params)
});

//AccessCode Handler
router.post('/access/new', function (req, res, next) {
  res.send(req.params)
});

module.exports = router;