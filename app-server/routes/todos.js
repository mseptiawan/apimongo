var express = require("express");
var router = express.Router();

const TodoController = require("../controller/todo");

router.post("/", TodoController.createTodo);

router.get("/", TodoController.getTodosByUser);

router.delete("/:id", TodoController.deleteTodo);

router.put("/:id", TodoController.updateTodo);

module.exports = router;
