const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const db = require('../models/index');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if email exists
  if (await db.User.findOne({ where: { email: email } })) {
    res.status(400);
    throw new Error('email "' + email + '" is already taken');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const { dataValues } = await db.User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (dataValues) {
    res.status(201).json({
      _id: dataValues.id,
      name: dataValues.name,
      email: dataValues.email,
      token: generateToken(17),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await db.User.findOne({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc    Get user data
// @route   GET /api/users/:id
// @access  public
const getMe = asyncHandler(async (req, res) => {
  var id = parseInt(req.params.id);
  const user = await db.User.findByPk(id);
  if (!user) throw Error('User not found');
  res.status(200).json(user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
