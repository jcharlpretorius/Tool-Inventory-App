const asyncHandler = require('express-async-handler');
const Tool = require('../models/tool');
const camelizeKeys = require('../utilities/camelize');

// Get all tools
const getAllTools = asyncHandler(async (req, res) => {
  let tools = await Tool.findAll();
  // convert keys to camel case
  tools = camelizeKeys(tools);
  res.status(200).json(tools);
});

// Get a single tool
const getTool = asyncHandler(async (req, res) => {
  const tool = await Tool.findById(req.params.id);

  // check if tool doesn't exist
  if (!tool) {
    const message = 'Tool not found';
    res.status(404).send({ message });
    throw new Error(message);
  }

  res.status(200).json(camelizeKeys(tool));
});

// Create new tool
const createNewTool = asyncHandler(async (req, res) => {
  let { toolId, price, toolType, quantity, name, supplierId } = req.body;
  // Validation -> check anything you set as NOT NULL in schema
  if (!toolId || !toolType || !name || !price || !supplierId) {
    const message = 'Please fill in all the required fields';
    res.status(400).send({ message });
    throw new Error(message);
  }

  // set default quanitity to 0
  if (!quantity) {
    quantity = 0;
  }

  // parse values
  try {
    quantity = Number(quantity);
    price = Number(quantity);
    supplierId = Number(quantity);
  } catch (error) {
    const message =
      'Please only enter number for quantity, price, and supplierId';
    res.status(400).send({ message });
    throw new Error(message);
  }

  // Create new tool
  const tool = new Tool(toolId, price, toolType, quantity, name, supplierId);
  const newTool = await tool.create();

  res.status(201).json(camelizeKeys(newTool));
});

// update tool
const updateTool = asyncHandler(async (req, res) => {
  const { id } = req.params; // tool id in params (url)
  let { price, toolType, quantity, name } = req.body;

  const tool = await Tool.findById(id);

  // check if tool doesn't exist
  if (!tool) {
    const message = `No tool with id: ${id} exists`;
    res.status(404).send(message);
    throw new Error(message);
  }

  // get value from database tool if any form values are left blank
  price = price ?? tool.price;
  quantity = quantity ?? tool.quantity;
  name = name ?? tool.name;
  toolType = toolType ?? tool.toolType;

  // parse numerical values
  try {
    quantity = Number(quantity);
    price = Number(price);
  } catch (error) {
    const message = 'Please only enter number for quantity and price';
    res.status(400).send({ message });
    throw new Error(message);
  }

  // Update tool
  const updatedTool = await Tool.update(
    id, // from the params
    price,
    toolType,
    quantity,
    name,
    tool.supplierId // from the database
  );
  res.status(200).json(camelizeKeys(updatedTool));
});

// delete tool
const deleteTool = asyncHandler(async (req, res) => {
  const tool = await Tool.findById(req.params.id);
  // if tool doesnt exist
  if (!tool) {
    const message = 'Tool not found';
    res.status(404).send(message);
    throw new Error(message);
  }
  await Tool.delete(req.params.id);
  res.status(200).json({ message: 'Tool successfully deleted' });
});

module.exports = {
  getAllTools,
  getTool,
  createNewTool,
  updateTool,
  deleteTool,
};
