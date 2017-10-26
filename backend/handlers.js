let express = require('express');
let router = express.Router();
let sql = require("./networkutil")

//Page Handler
router.get('/pages/:pageID/users/:userID', function (req, res, next) {
  let connection = sql.SQLConnect(false);
  sql.GetPage(connection, req.params.pageID, req.params.userID, function (error, results, fields) {
    if (error) res.send(error);
    res.send(results[0]);
  });
});

//Book Handler
router.get('/pages/:count/:offset', function (req, res, next) {
  let offset = parseInt(req.params.offset);
  let count = parseInt(req.params.count);
  let connection = sql.SQLConnect(false);
  sql.GetBook(connection, offset, count, function (error, results, fields) {
    if (error) res.send(error);
    res.send({pages: results, count: count, offset: offset, length: results.length});
  });
});

//Register Handler
router.post('/register', function (req, res, next) {
  let connection = sql.SQLConnect(false);
  sql.Register(connection, req.body.username, req.body.email, req.body.accessCode, req.body.password, function(error, results, fields){
    //TODO field check
  });
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