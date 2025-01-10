const Todo = require("../model/todos");

// Get todos by userId
exports.getTodosByUser = (req, res) => {
  const userId = req.query.userId; // Pastikan userId diambil dari token atau query string

  if (!userId) {
    return res.status(400).json({
      message: "User ID is required",
    });
  }

  Todo.find({ user: userId })
    .then((todos) => {
      console.log(todos); // Debugging to check the todos
      res.json({ message: "Todos retrieved successfully", todos });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving todos",
        error: err,
      });
    });
};

// Create a new Todo
exports.createTodo = (req, res) => {
  const { title, description, dueDate, completed, category } = req.body;
  const userId = req.userId; // Menyimpan userId yang dikirim dari middleware auth atau user service

  // Pastikan userId ada, jika tidak ada akan memberi response error
  if (!userId) {
    return res.status(400).json({
      message: "User ID is required",
    });
  }

  // Membuat Todo baru
  const newTodo = new Todo({
    title,
    description,
    dueDate,
    category,
    completed: completed || false, // Default to false if not provided
    user: userId, // Menyimpan userId yang dikirim dari frontend
  });

  // Menyimpan Todo ke database
  newTodo
    .save()
    .then((createdTodo) => {
      res.status(201).json({
        message: "Todo created successfully",
        todoId: createdTodo._id,
        todo: createdTodo,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error creating todo",
        error: err,
      });
    });
};

// Delete Todo by ID
exports.deleteTodo = (req, res) => {
  const { id } = req.params;

  Todo.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: "Todo deleted successfully" });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Error deleting todo",
        error: err,
      });
    });
};

// Update Todo by ID
exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  Todo.findByIdAndUpdate(id, updates, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({
          message: "Todo not found",
        });
      }
      res.json({
        message: "Todo updated successfully",
        todo: updatedTodo,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Error updating todo",
        error: err,
      });
    });
};
