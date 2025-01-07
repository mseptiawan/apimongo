var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./app-server/routes/index");
var usersRouter = require("./app-server/routes/users");
var todoRouter = require("./app-server/routes/todos");
var categoriesRouter = require("./app-server/routes/categories");
//CORS Enabled
//Cross Origin Resource Sharing
const mongoose = require("mongoose");
require("./app-server/model/db");
var app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// mongoose.connect(
//   // "mongodb://localhost:27017/dbbuku"
//   "mongodb+srv://mdp:MDDc8YvG1ZTvP8re@cluster0.e0yel.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0"
// ).then(() => {
//   console.log("Connected to Database");
// }).catch((err) => {
//   console.error("App Starting error", err.stack);
//   console.log("Connection Failed");
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/todos", todoRouter);
app.use("/categories", categoriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page

  res.status(500).json({
    message: "Something went wrong!", // Kirimkan error sebagai JSON
    error: err.message,
  });
});

module.exports = app;
