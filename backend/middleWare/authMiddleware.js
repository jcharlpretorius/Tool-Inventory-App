const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');
const { ROLE } = require('../data/data');

// Middleware for restricting access to logged in Employees
const authEmp = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(403);
      throw new Error('User not authorized, please login');
    }

    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Get employee id from token
    const employee = await Employee.findById(verified.id);

    if (!employee) {
      res.status(401);
      throw new Error('Employee not found');
    }
    req.employee = employee; // set employee to employee we got from the database
    next(); // need to call next, to go to the next middleware
  } catch (error) {
    res.status(401);
    throw new Error('User not authorized, please login');
  }
});

//  middleware function for restricting permission to managers -> Must use after authEmp middleware
const authManager = asyncHandler(async (req, res, next) => {
  if (req.employee.role !== ROLE.MNGR) {
    res.status(403);
    throw new Error('Employee not authorized. Manager access only.');
  }
  next();
});

module.exports = { authEmp, authManager };
