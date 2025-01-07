// controllers/user.js
const User = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Sign Up Controller
const signUp = (req, res) => {
  const { username, email, password } = req.body;
  // Meng-hash password yang diterima dari client
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash, // Simpan password yang sudah di-hash
      });

      user
        .save()
        .then((result) => {
          res.status(202).json({
            message: "User Created Successfully",
          });
        })
        .catch((err) => {
          res.status(501).json({
            message: "Internal Server Error",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to hash password",
        error: err,
      });
    });
};

// Login Controller
const login = (req, res) => {
  let fetchedUser;

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed, email not found!",
        });
      }

      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password); // Bandingkan password yang dimasukkan dengan password yang sudah di-hash
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed, incorrect password!",
        });
      }

      // Jika password benar, buat token JWT
      const token = jwt.sign(
        { email: fetchedUser.email, userid: fetchedUser._id },
        "gwsca", // Secret key (sebaiknya simpan di environment variables)
        { expiresIn: "1h" }
      );

      return res.status(200).json({ token: token });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed!",
        error: err,
      });
    });
};

module.exports = { signUp, login };
