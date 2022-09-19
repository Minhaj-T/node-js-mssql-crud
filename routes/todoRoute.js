const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  newTodo,
  getTodo,
  deleteTodo,
  editTodo
} = require('../controllers/todoController');

router.get('/all', getAllTodos);
router.post('/new', newTodo);
router.get('/find/:id', getTodo);
router.delete('/delete/:id', deleteTodo);
router.put('/edit/:id',editTodo );

module.exports = router;
