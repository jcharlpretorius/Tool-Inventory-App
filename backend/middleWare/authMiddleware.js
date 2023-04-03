const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');
const { ROLE } = require('../data/data');

const authEmp = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error('User not authorized, please login');
    }

    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Get employee id from token
    const employee = await Employee.findById(verified.id).select('-password'); // don't send password back

    if (!employee) {
      res.status(401);
      throw new Error('User not found');
    }
    req.employee = employee; // set employee to employee we got from the database
    next(employee); // need to call next, to go to the next middleware
  } catch (error) {
    res.status(401);
    throw new Error('User not authorized, please login');
  }
});

//  function for handling manager permissions -> use after authEmp middleware
function authManager(employee) {
  return (req, res, next) => {
    // need to make some attribute of employee to know if they are a manager or a sales associate
    if (employee.role !== ROLE.MNGR) {
      res.status(401);
      return res.send('User not allowed');
    }
    next();
  };
}

module.exports = { authEmp, authManager };
