const Todo = require("../model/todos");

const createTodo = (req, res) => {

  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
    dueDate: req.body.dueDate,
    user: req.body.user,
    category: req.body.category,
  });

  console.log(todo);
  todo
    .save()
    .then((createdTodo) => {
      res.status(201).json({
        message: "Data berhasil disimpan",
        todoId: createdTodo._id,
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

const readTodo = async (req, res) => {
  try {
    const todos = await Todo.find()
      .populate("user", "username email") // Populate data user, hanya ambil name dan email
      .populate("category", "name"); // Populate data category, hanya ambil name

    res.status(200).json({
      message: "Get Data Todo",
      todos: todos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message, // Menyertakan pesan error untuk debugging
    });
  }
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
  const todo = new Todo({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
    dueDate: req.body.dueDate,
    user: req.body.user,
    category: req.body.category,
    createdAt: req.body.createdAt,
  });

  Todo.updateOne({ _id: req.params.id }, todo)
    .then((hasil) => {
      res.status(200).json({
        message: "Update Berhasil",
        result: hasil,
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
module.exports = { createTodo, readTodo, deleteTodo, updateTodo };
