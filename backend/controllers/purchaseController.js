const asyncHandler = require('express-async-handler');
const Purchase = require('../models/purchase');
const Payment = require('../models/Payment');
const Employee = require('../models/employee');
const camelizeKeys = require('../utilities/camelize');
const PurchaseLine = require('../models/PurchaseLine');

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

// this method adds a payment, a purchase, and purchase_lines to the database
const createNewPurchase = asyncHandler(async (req, res) => {
  // destructure the reqest body
  const { employeeId, customerId, paymentType, items, total } = req.body;

  // test If I am getting the values from the frontend
  console.log(`Inside purchase Controller`);
  console.log(`employeeId: ${employeeId}`);
  console.log(`customerId: ${customerId}`);
  console.log(`paymentType: ${paymentType}`);
  console.log(`total: ${total}`);
  // items are a list of tools with an extra attribute: cartQty
  console.log(items);

  // validation -> no empty field
  if (!employeeId || !customerId || !paymentType || !items || !total) {
    res.status(400);
    throw new Error('Missing form data. Cannot make purchase');
  }

  // add payment to database
  const tempPayment = new Payment(paymentType, total, customerId);
  const payment = await tempPayment.create(); // this payment object has the id as well

  // add purchase to database
  const tempPurchase = new Purchase(employeeId, payment.paymentId);
  const purchase = await tempPurchase.create();
  const purchaseId = purchase.purchaseId;

  // add purchase lines to database
  items.forEach(async (item, index) => {
    /*  
      add 1 to index because javascript is zero indexed
      make sure to use cartQty, not quantity in stock
    */
    const purchaseLine = new PurchaseLine(
      purchaseId,
      index + 1,
      item.toolId,
      item.cartQty
    );
    await purchaseLine.create();
  });

  res.status(200).send('Purchase added successfully!');
});

module.exports = {
  getAllPurchases,
  getPurchase,
  createNewPurchase,
};
