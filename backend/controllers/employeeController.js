const asyncHandler = require('express-async-handler');
const Employee = require('../models/Employee');

// Get all employees
const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.findAll();
  res.status(200).json({ count: employees.length, employees });
});

// Get a single employee
const getEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  // check if employee doesn't exist
  if (!employee) {
    res.status(404);
    throw new Error('employee not found');
  }

  res.status(200).json(employee);
});

// Create new employee
const createNewEmployee = asyncHandler(async (req, res) => {
  const { firstName, minit, lastName, phoneNumber, email } = req.body;

  // Validation -> check anything you set as NOT NULL in schema
  if (!firstName || !lastName || !email) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }
  // do we need additional logic here to validate values recieved from body?
  // Use express validator if you have time
  // verify email is correct format

  // check if employee email already exits
  const registeredEmail = await Employee.getEmail(email);
  console.log(registeredEmail);
  console.log(registeredEmail[0]);
  if (registeredEmail.length !== 0) {
    res.status(400);

    throw new Error(
      `Email ${registeredEmail[0].Email} has already been registered`
    );
  }

  // Create new employee
  const employee = new Employee(firstName, minit, lastName, phoneNumber, email);
  const newEmployee = await employee.create(); // note: create() called on obj

  res.status(201).json({ newEmployee });
});

// update employee information
const updateEmployee = asyncHandler(async (req, res) => {
  // need employeeId to find employee in db
  const { id } = req.params; // employee id in params (url)
  const { firstName, minit, lastName, phoneNumber, email } = req.body;

  let employee = await Employee.findById(req.params.id);

  // check if employee doesn't exist
  if (!employee) {
    res.status(404);
    throw new Error(`No employee with id: ${id} exists`);
  }

  // Update employee
  // You could get all the values from the front end and use a getemployee query
  // to fill the fields automatically (for quality of life improvement)
  // do validation on the front end too.
  const updatedEmployee = await Employee.update(
    id,
    firstName,
    minit,
    lastName,
    phoneNumber,
    email
  );
  res.status(200).json({ updatedEmployee });
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

module.exports = {
  getAllEmployees,
  getEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
};
