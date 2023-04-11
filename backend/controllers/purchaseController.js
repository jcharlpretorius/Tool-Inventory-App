const asyncHandler = require('express-async-handler');
const Purchase = require('../models/Purchase');
const Payment = require('../models/Payment');
const Employee = require('../models/Employee');
const Tool = require('../models/Tool');
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
  // destructure the request body
  const { employeeId, customerId, paymentType, items, total } = req.body;

  // test If I am getting the values from the frontend
  // console.log(`Inside purchase Controller`);
  // console.log(`employeeId: ${employeeId}`);
  // console.log(`customerId: ${customerId}`);
  // console.log(`paymentType: ${paymentType}`);
  // console.log(`total: ${total}`);
  // items are a list of tools with an extra attribute: cartQty
  // console.log(items);

  // validation -> no empty field
  if (!employeeId || !customerId || !paymentType || !items || !total) {
    res.status(400);
    throw new Error('Missing form data. Cannot make purchase');
  }
  // check if any item's cartQty is greater than the quantity in stock
  items.forEach(async (item) => {
    if (item.cartQty > item.quantity) {
      // shorten the length of the tool name if necessary
      let shortenedText = '<Cart_Item_Name>';
      if (item.name !== undefined && item.name > 20) {
        shortenedText = item.name.substring(0, 20).concat('...');
      }
      res.status(400);
      throw new Error(
        `Inventory Stock Error: Cannot purchase more than ${
          item.quantity
        } of ${shortenedText.substring(0, 20)}`
      );
    }
  });

  // add payment to database
  const tempPayment = new Payment(paymentType, total, customerId);
  const payment = await tempPayment.create(); // this payment object has the id as well

  // add purchase to database
  const tempPurchase = new Purchase(employeeId, payment.paymentId);
  const purchase = await tempPurchase.create();
  const purchaseId = purchase.purchaseId;

  // add purchase lines to database
  items.forEach(async (item, index) => {
    // add 1 to index because JS is zero indexed
    const purchaseLine = new PurchaseLine(
      purchaseId,
      index + 1,
      item.toolId,
      item.cartQty
    );
    await purchaseLine.create();

    // subtract the purchased quantities from the tool
    const newQuantity = item.quantity - item.cartQty;
    await Tool.updateQuantity(item.toolId, newQuantity);
  });

  res.status(200).send('Purchase added successfully!');
});

module.exports = {
  getAllPurchases,
  getPurchase,
  createNewPurchase,
};
