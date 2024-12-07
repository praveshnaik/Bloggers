const User = require('../models/User');
const Blog = require('../models/Blogs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { body, validationResult } = require('express-validator');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'server error' });
    }
};

// Validation middleware
const validateSignup = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  body('email')
    .isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number'),
];

// Signup controller
exports.signup = [
  validateSignup, 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
        const userEmail = await User.findOne({email})
        if (userEmail) {
            return res
              .status(400)
              .send(`An account with the email ${req.body.email} already exists`);
          }
      const newUser = await User.create({ name, email, password });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error: 'User registration failed' });
    }
  }
];


exports.blog =  async (req, res) => {
    const { name, design,html,wrappedHtml,userid} = req.body;
    try {
      const newBlog = new Blog({ name, design,html,wrappedHtml,userId:userid});
      await newBlog.save();
      res.json(newBlog);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


