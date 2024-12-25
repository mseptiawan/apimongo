const mongoose = require("mongoose");
mongoose.connect(
    
    "mongodb+srv://mdp:MDDc8YvG1ZTvP8re@cluster0.e0yel.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0"
  ).then(() => {
    console.log("Connected to Database");
  }).catch((err) => {
    console.error("App Starting error", err.stack);
    console.log("Connection Failed");
  });
  