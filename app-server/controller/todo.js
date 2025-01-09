const Todo = require("../model/todos");
const createTodo = (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
    dueDate: req.body.dueDate,
    user: req.body.user, // Menyimpan userId yang dikirim dari frontend
    category: req.body.category,
  });

  console.log(todo); // Menampilkan todo untuk debugging
  todo
    .save()
    .then((createdTodo) => {
      res.status(201).json({
        message: "Data berhasil disimpan",
        todoId: createdTodo._id,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Internal server error!",
      });
    });
};

const readTodo = async (req, res) => {
  const userId = req.query.userId; // Mengambil userId dari query parameter
  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  try {
    // Sesuaikan dengan field yang ada di model Anda, misalnya 'user' atau 'userId'
    const todos = await Todo.find({ user: userId }); // Menggunakan 'user' untuk filter todos berdasarkan userId
    res.json(todos);
  } catch (err) {
    res.status(500).send("Error fetching todos");
  }
  res.set("Cache-Control", "no-store");
};

const deleteTodo = (req, res) => {
  Todo.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "Todo berhasil dihapus ",
        result: result,
      });
    })
    .catch((err) => {
      //console.log(err);
      res.status(500).json({
        message: "internal server error !",
        //error : err
      });
    });
};
const updateTodo = (req, res) => {
  const todo = {
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
    dueDate: req.body.dueDate,
    user: req.body.user, // Menggunakan userId yang dikirim untuk update
    category: req.body.category,
    createdAt: req.body.createdAt,
  };

  Todo.updateOne({ _id: req.params.id }, todo)
    .then((result) => {
      res.status(200).json({
        message: "Update Berhasil",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Internal server error!",
      });
    });
};

module.exports = { createTodo, readTodo, deleteTodo, updateTodo };
