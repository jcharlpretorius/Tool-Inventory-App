const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');
const { ROLE } = require('../data/data');

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
    // next(employee); // need to call next, to go to the next middleware
    // console.log('huh?');
    next();
  } catch (error) {
    res.status(401);
    throw new Error('User not authorized, please login');
  }
});

//  function for handling manager permissions -> use after authEmp middleware
// function authManager(employee) {
const authManager = asyncHandler(async (req, res, next) => {
  if (req.employee.role !== ROLE.MNGR) {
    res.status(403);
    throw new Error('Employee not authorized. Manager access only.');
  }
  next();
});
//   console.log('inside authmanager');
//   return (req, res, next) => {
//     // need to make some attribute of employee to know if they are a manager or a sales associate
//     if (req.employee.role !== ROLE.MNGR) {
//       res.status(403);
//       return res.send('Employee not authorized. Manager access only.');
//     }
//     next();
//   };
// }

module.exports = { authEmp, authManager };
