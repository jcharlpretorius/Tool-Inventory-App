const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Employee = require('../models/Employee');
const OrderLine = require('../models/OrderLine');

// Get all orders
const getAllOrders = asyncHandler(async (req, res) => {
  let orders = await Order.findAll();
  // convert keys to camel case
  orders = camelizeKeys(orders);
  res.status(200).json(orders);
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
  // const employee = await Employee.findById(req.employee.employeeId);
  const { employeeId, total, items } = req.body;

  // validation -> no empty field
  if (!employeeId || !items || !total) {
    res.status(400);
    throw new Error('Missing form data. Cannot make order');
  }

  // add order to database
  const tempOrder = new Order(employeeId);
  const order = await tempOrder.create();
  const orderId = order.orderId;

  // add order lines to database
  items.forEach(async (item, index) => {
    // add 1 to index because JS is zero indexed
    const orderLine = new OrderLine(
      orderId,
      index + 1,
      item.toolId,
      item.cartQty
    );
    await orderLine.create();
  });

  res.status(200).send('Order added successfully!');
  // Create new order
  // const order = new Order(employee.employeeId);
  // const newOrder = await order.create();

  // res.status(201).json(newOrder);
});

module.exports = {
  getAllOrders,
  getOrder,
  createNewOrder,
};
