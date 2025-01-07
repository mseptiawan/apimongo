// routes/users.js
var express = require("express");
var router = express.Router();

const UserController = require("../controller/user");

// Route untuk sign up (registrasi)
router.post("/signup", UserController.signUp);

// Route untuk login
router.post("/login", UserController.login);

module.exports = router;
