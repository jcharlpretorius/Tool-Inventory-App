const asyncHandler = require('express-async-handler');
const Purchase = require('../models/purchase');
const Employee = require('../models/employee');
const camelizeKeys = require('../utilities/camelize');

// Get all purchases
const getAllPurchases = asyncHandler(async (req, res) => {
  let purchases = await Purchase.findAll();
  // convert keys to camel case
  purchases = camelizeKeys(purchases);
  res.status(200).json(purchases);
});

// Get a single purchase
const getPurchase = asyncHandler(async (req, res) => {
  // NOTE: maybe use a form for getting the purchase, rather than params
  //
  const purchase = await Purchase.findById(req.params.id);

  // check if purchase doesn't exist
  if (!purchase) {
    res.status(404);
    throw new Error('Purchase not found');
  }

  res.status(200).json(purchase);
});

// Create new purchase
// Should this include payment?
const createNewPurchase = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.employee.employeeId);
  const { paymentId } = req.body; // where from frontend are we sending the paymentID?

  // Validation -> check anything you set as NOT NULL in schema
  if (!paymentId) {
    res.status(400);
    throw new Error('Please fill in all the required fields');
  }

  // Create new purchase
  const purchase = new Purchase(employee.employeeId, paymentId);
  const newPurchase = await purchase.create();

  res.status(201).json(newPurchase);

  // what happens when I add a payment? what is the order of operations to complete a customer's purchase?
});

module.exports = {
  getAllPurchases,
  getPurchase,
  createNewPurchase,
};
