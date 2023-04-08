const asyncHandler = require('express-async-handler');
const Purchase = require('../models/purchase');
const Payment = require('../models/Payment');
const Employee = require('../models/employee');
const { findRecentSales, findTopSalesMen } = require('../models/Sales');
const camelizeKeys = require('../utilities/camelize');

// Note that the Sales model is different. It is not a class

const getRecentSales = asyncHandler(async (req, res) => {
  let sales = await findRecentSales();

  if (!sales) {
    res.status(400);

    throw new Error('No sales found');
  }
  sales = camelizeKeys(sales);

  // console.log(`Sales: ${JSON.stringify(sales)}`);
  res.status(200).send(sales);
});

const getTopSalesMen = asyncHandler(async (req, res) => {
  let topSales = await findTopSalesMen();

  if (!topSales) {
    res.status(400);
    throw new Error('No sales found');
  }
  topSales = camelizeKeys(topSales);
  // console.log(`topSales: ${JSON.stringify(topSales)}`);
  res.status(200).send(topSales);
});

module.exports = { getRecentSales, getTopSalesMen };
