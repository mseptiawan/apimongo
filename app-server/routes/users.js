var express = require("express");
var router = express.Router();

const UserController = require("../controller/user");

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

module.exports = router;
