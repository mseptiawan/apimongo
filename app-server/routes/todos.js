var express = require("express");
var router = express.Router();

const TodoController = require("../controller/todo");

//insert
router.post("/", TodoController.createTodo);

router.get("/", TodoController.getTodosByUser);

//delete
router.delete("/:id", TodoController.deleteTodo);

//update
router.put("/:id", TodoController.updateTodo);

module.exports = router;
