var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

const UserController = require("../controller/user");

router.post('/', UserController.signUp);

module.exports = router;
