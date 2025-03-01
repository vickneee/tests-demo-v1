const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Generate JWT
const generateToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {
    expiresIn: '3d',
  });
};

// @desc Register new user
// @route POST /api/users/signup
// @access Public
const signupUser = async (req, res) => {
  const {
    name, email, password, phone_number, gender, date_of_birth, membership_status
  } = req.body;
  
  try {
    if (!name || !email || !password || !phone_number || !gender || !date_of_birth || !membership_status) {
      throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid');
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough');
    }
    
    const exists = await User.findOne({email});
    if (exists) {
      throw Error('Email already in use');
    }
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    const user = await User.create({
      name,
      email,
      password: hash,
      phone_number,
      gender,
      date_of_birth,
      membership_status
    });
    
    const token = generateToken(user._id);
    res.status(201).json({email, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    if (!email || !password) {
      throw Error("All fields must be filled");
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      throw Error("Incorrect email");
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect password");
    }
    
    const token = generateToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

module.exports = {
  signupUser,
  loginUser,
  getMe,
};
