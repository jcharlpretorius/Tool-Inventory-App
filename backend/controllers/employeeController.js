const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ROLE } = require('../data/data');
const Employee = require('../models/Employee');
const camelizeKeys = require('../utilities/camelize');
const SalesAssociate = require('../models/SalesAssociate');

// Generate a jwt token for login
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Get all employees
const getAllEmployees = asyncHandler(async (req, res) => {
  let employees = await Employee.findAll();
  // convert keys to camel case
  employees = camelizeKeys(employees);
  res.status(200).json(employees);
});

// Get a single employee (the currently logged in employee)
const getEmployee = asyncHandler(async (req, res) => {
  // note the difference in getting id from req instead of params
  // we used the employee set in the req object by the authEmp middleware
  let employee = await Employee.findById(req.employee.employeeId);

  // check if employee doesn't exist -> this should never actually happen
  if (!employee) {
    res.status(400);
    throw new Error('employee not found');
  }

  // convert keys to camel case
  employee = camelizeKeys(employee);
  res.status(200).json(employee);
});

// Create new employee -> this isn't working completely//
// you need to accept a role, and if role = Sales then add to sales
// or just make it so only Sales associates can be created
const registerEmployee = asyncHandler(async (req, res) => {
  // potentially change source of info from req.body to a form.
  const {
    firstName,
    minit,
    lastName,
    phoneNumber,
    email,
    commission,
    password,
  } = req.body;

  // Validation -> check anything you set as NOT NULL in schema
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all the required fields');
  }

  // do we need additional logic here to validate values recieved from body?

  // check if employee email already exits
  const registeredEmail = await Employee.getEmail(email);

  if (registeredEmail.length !== 0) {
    res.status(400);

    throw new Error(
      `Email ${registeredEmail[0].Email} has already been registered`
    );
  }

  // Hash password before saving to DB
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // by default, role is set to BASIC ('sales'), until you add manager registration
  const role = ROLE.BASIC;

  // Create new employee
  const employee = new Employee(
    firstName,
    minit,
    lastName,
    phoneNumber,
    email,
    hashedPassword,
    role
  );

  // You could update this so that password is not sent back to frontend
  const newEmployee = await employee.create();

  // Creatn new sales associate
  const sa = new SalesAssociate(newEmployee.employeeId, commission);
  // add employee to sales associate table. Kinda wack but ok
  const newSalesAssociate = await sa.create();

  res.status(201).json(newEmployee);
});

// update employee information, except for commission rate
const updateEmployee = asyncHandler(async (req, res) => {
  // need employeeId to find employee in db
  // const { id } = req.params; // employee id in params (url)
  const { employeeId, firstName, minit, lastName, phoneNumber, email, role } =
    req.body;

  // let employee = await Employee.findById(req.params.id);
  const employee = await Employee.findById(employeeId);

  // check if employee doesn't exist
  if (!employee) {
    res.status(404);
    throw new Error(`No employee with id: ${employeeId} exists`);
  }

  const updatedEmployee = await Employee.update(
    employeeId,
    firstName,
    minit,
    lastName,
    phoneNumber,
    email
  );

  res.status(200).json(updatedEmployee);
});

// Delete Employee
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  // if employee doesnt exist
  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }
  await Employee.delete(req.params.id);
  res.status(200).json({ message: 'Employee deleted.' });
});

// add method to update employee commission rate (managers only can change this)

// Login employee
const loginEmployee = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Validate Request
  if (!email || !password) {
    res.status(400);
    throw new Error('Please add email and password');
  }

  // Check if employee exists
  const employee = await Employee.findByEmail(email);

  // employee exists, now check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, employee.password);

  // Generate a token
  const token = generateToken(employee.employeeId);

  // Send http-only cookie
  if (passwordIsCorrect) {
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // token expires in 1 day
      sameSite: 'none',
      secure: false, // so that we can send cookie over http, not https
    });
  }

  if (employee && passwordIsCorrect) {
    const { employeeId, firstName, minit, lastName, phoneNumber, email, role } =
      employee;
    res.status(200).json({
      employeeId,
      firstName,
      minit,
      lastName,
      phoneNumber,
      email,
      role,
      // token, // do I need to send the token ?
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

// Logout Employee
const logoutEmployee = asyncHandler(async (req, res) => {
  // we can either delete the cookie from the frontend or we can expire it
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'none',
    secure: false,
  });
  return res.status(200).json({ message: 'Successfully Logged Out' });
});

// Get the login status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

// Add password
// Method for getting a a hashed password to Employees who don't already have a password
// Only exists to add dummy data to the database, can be removed eventualy
const addPassword = asyncHandler(async (req, res) => {
  const { id } = req.params.id;
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(`Password: ${password}`);
  console.log(`Hashed password: ${hashedPassword}`);

  return res
    .status(200)
    .json({ id: id, password: password, hashed: hashedPassword });
});

module.exports = {
  getAllEmployees,
  getEmployee,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
  loginEmployee,
  logoutEmployee,
  loginStatus,
  addPassword,
};
