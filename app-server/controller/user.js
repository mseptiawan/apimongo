const User = require("../model/users");
const bcrypt = require("bcrypt");

const signUp = (req, res) => {
  const { username, email, password } = req.body;

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash, 
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
      
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed, incorrect password!",
        });
      }

      return res.status(200).json({
        message: "Login successful",
        userId: fetchedUser._id, 
        username: fetchedUser.username,
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
