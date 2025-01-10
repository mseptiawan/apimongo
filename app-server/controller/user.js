// controllers/user.js
const User = require("../model/users");
const bcrypt = require("bcrypt");

// Sign Up Controller
const signUp = (req, res) => {
  const { username, email, password } = req.body;

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

// Login Controller tanpa token
const login = (req, res) => {
  let fetchedUser;

  // Cari user berdasarkan email
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed, email not found!",
        });
      }

      fetchedUser = user;
      // Bandingkan password yang dimasukkan dengan password yang sudah di-hash
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed, incorrect password!",
        });
      }

      // Hanya kirimkan userId ke frontend tanpa JWT
      return res.status(200).json({
        message: "Login successful",
        userId: fetchedUser._id, // Kirimkan userId di sini
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Auth failed!",
        error: err,
      });
    });
};

module.exports = { signUp, login };
