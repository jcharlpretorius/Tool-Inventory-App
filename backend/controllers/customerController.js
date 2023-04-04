const asyncHandler = require('express-async-handler');
const Customer = require('../models/customer');

// Get all customers
const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.findAll();
  res.status(200).json({ count: customers.length, customers });
});

// Get a single customer
const getCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  // check if customer doesn't exist
  if (!customer) {
    res.status(404);
    throw new Error('Customers not found');
  }

  res.status(200).json(customer);
});

// Create new customer
const createNewCustomer = asyncHandler(async (req, res) => {
  const { firstName, minit, lastName, address, email } = req.body;

  // Validation -> check anything you set as NOT NULL in schema
  if (!firstName || !lastName || !email) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }
  // do we need additional logic here to validate values recieved from body?
  // Use express validator if you have time
  // verify email is correct format

  // check if customer email already exits
  const registeredEmail = await Customer.getEmail(email);
  console.log(registeredEmail);
  console.log(registeredEmail[0]);
  if (registeredEmail.length !== 0) {
    res.status(400);

    throw new Error(
      `Email ${registeredEmail[0].Email} has already been registered`
    );
  }

  // Create new customer
  const customer = new Customer(firstName, minit, lastName, address, email);
  const newCustomer = await customer.create(); // note: create() called on obj

  res.status(201).json({ newCustomer });
});

// update customer information
const updateCustomer = asyncHandler(async (req, res) => {
  // need customerId to find customer in db
  const { id } = req.params; // customer id in params (url)
  const { firstName, minit, lastName, address, email } = req.body;

  let customer = await Customer.findById(id);

  // check if customer doesn't exist
  if (!customer) {
    res.status(404);
    throw new Error(`No customer with id: ${id} exists`);
  }

  // Update customer
  // You could get all the values from the front end and use a getCustomer query
  // to fill the fields automatically (for quality of life improvement)
  // do validation on the front end too.
  const updatedCustomer = await Customer.update(
    id,
    firstName,
    minit,
    lastName,
    address,
    email
  );
  res.status(200).json({ updatedCustomer });
});

// Delete Customer

const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  // if customer doesnt exist
  if (!customer) {
    res.status(404);
    throw new Error('Customer not found');
  }
  await Customer.delete(req.params.id);
  res.status(200).json({ message: 'Customer deleted.' });
});

module.exports = {
  getAllCustomers,
  getCustomer,
  createNewCustomer,
  updateCustomer,
  deleteCustomer,
};
