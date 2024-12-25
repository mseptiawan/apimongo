var express = require('express');
var router = express.Router();


const TodoController = require("../controller/todo")
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond dari BUKU router');
// });


//insert
router.post('/', TodoController.createTodo);


//select
router.get("/", TodoController.readTodo);


//delete
router.delete('/:id', TodoController.deleteTodo);


//update
router.put('/:id', TodoController.updateTodo);


module.exports = router;