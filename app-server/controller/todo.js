const Todo = require("../model/todos");
exports.getTodosByUser = (req, res) => {
  const userId = req.query.userId; // Pastikan ini diambil dari token yang telah diverifikasi

  if (!userId) {
    return res.status(400).json({
      message: "User ID is required",
    });
  }

  Todo.find({ user: userId })
    .then((todos) => {
      console.log(todos);
      res.json({ message: "Todos retrieved successfully", todos });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retrieving todos", error: err });
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
  const newTodo = new Todo({
    title,
    description,
    dueDate,
    category,
    completed: completed || false,
    user: req.userId, // Mengambil userId dari token
  });

  newTodo
    .save()
    .then((todo) => res.status(201).json(todo))
    .catch((err) =>
      res.status(400).json({ message: "Error creating todo", error: err })
    );

};

// Delete Todo
exports.deleteTodo = (req, res) => {
  const { id } = req.params;

  Todo.findByIdAndDelete(id)
    .then(() => res.json({ message: "Todo deleted successfully" }))
    .catch((err) =>
      res.status(400).json({ message: "Error deleting todo", error: err })
    );
};


// Update Todo
exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  Todo.findByIdAndUpdate(id, updates, { new: true })
    .then((todo) => res.json(todo))
    .catch((err) =>
      res.status(400).json({ message: "Error updating todo", error: err })
    );
};

