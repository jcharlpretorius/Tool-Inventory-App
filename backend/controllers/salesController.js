// const asyncHandler = require('express-async-handler');
// const Purchase = require('../models/purchase');
// const Payment = require('../models/Payment');
// const Employee = require('../models/employee');
// const camelizeKeys = require('../utilities/camelize');

// const makePurchase = asyncHandler(async (req, res) => {
//   // destructure the reqest body
//   const { employeeId, customerId, paymentType, items, total } = req.body;

//   // validation -> no empty field
//   if (!employeeId || !customerId || !paymentType || !items || !total) {
//     res.status(400);
//     throw new Error('Missing form data. Cannot make purchase');
//   }

//   // add payment to database
//   const tempPayment = new Payment(paymentType, total, customerId);
//   const payment = await payment.create(); // this payment object has the id as well

//   // add purchase to database
//   const tempPurchase = new Purchase();
//   const purchase = await purchase.create();

//   // items are a list of tools with an extra attribute: cartQty
//   console.log(items);

//   // add purchase lines to database
// });

// module.exports = { makePurchase };
