const asyncHandler = require('express-async-handler');
const db = require('../models/index');

// @desc   get all todo
// @route   GET /api/all
// @access  Public
const getAllTodos = asyncHandler(async (req, res) => {
  const allTodos = await db.Todo.findAll();

  res.status(200).json(allTodos);
});

// @desc   post new todo
// @route   POST /api/new
// @access  Public
const newTodo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const newTodo = await db.Todo.create({
    text: req.body.text,
  });

  res.status(200).json(newTodo);
});

// @desc   get the single todo by id
// @route   GET /find/:id
// @access  Public
const getTodo = asyncHandler(async (req, res) => {
  var todoId = parseInt(req.params.id);
  const Todo = await db.Todo.findByPk(todoId);
  res.status(200).json(Todo);
});

// @desc   delete todo
// @route   DELETE /delete/:id
// @access  Public
const deleteTodo = asyncHandler(async (req, res) => {
  const Todo = await db.Todo.destroy({ where: { id: req.params.id } });
  res.status(200).json(Todo);
});

// @desc   edit todo
// @route   PUT /edit/:id
// @access  Public
const editTodo = asyncHandler(async (req, res) => {
  const {text} = req.body;
  const Todo= await db.Todo.upsert({
    id: req.params.id,
    text,
  });
  res.status(200).json(Todo);
});
module.exports = {
  getAllTodos,
  newTodo,
  getTodo,
  deleteTodo,
  editTodo,
};
