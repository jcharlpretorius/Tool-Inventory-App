const asyncHandler = require('express-async-handler');
const Order = require('../models/Order'); // vs code thinks this should be capitalized? maybe a bug
const Employee = require('../models/employee');

// Get all orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findAll();
  res.status(200).json({ count: orders.length, orders });
});

// Get a single order
const getOrder = asyncHandler(async (req, res) => {
  // NOTE: maybe use a form for getting the order, rather than params
  //
  const order = await Order.findById(req.params.id);

  // check if order doesn't exist
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.status(200).json(order);
});

// Create new order
const createNewOrder = asyncHandler(async (req, res) => {
  // The employee here gives us access to the manager's ID
  const employee = await Employee.findById(req.employee.employeeId);

  // Create new order
  const order = new Order(employee.employeeId);
  const newOrder = await order.create();

  res.status(201).json(newOrder);
});

module.exports = {
  getAllOrders,
  getOrder,
  createNewOrder,
};
