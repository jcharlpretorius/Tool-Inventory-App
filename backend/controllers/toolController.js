const asyncHandler = require('express-async-handler');
const Tool = require('../models/tool');

// Get all tools
const getAllTools = asyncHandler(async (req, res) => {
  const tools = await Tool.findAll();
  res.status(200).json({ count: tools.length, tools });
});

// Get a single tool
const getTool = asyncHandler(async (req, res) => {
  const tool = await Tool.findById(req.params.id);

  // check if tool doesn't exist
  if (!tool) {
    res.status(404);
    throw new Error('Tool not found');
  }

  res.status(200).json(tool);
});

// Create new tool
const createNewTool = asyncHandler(async (req, res) => {
  const { toolId, price, toolType, quantity, name, supplierId } = req.body;

  // Validation -> check anything you set as NOT NULL in schema
  if (!toolId) {
    res.status(400);
    throw new Error('Please fill in all the required fields');
  }

  // Create new tool
  const tool = new Tool(toolId, price, toolType, quantity, name, supplierId);
  const newTool = await tool.create();

  res.status(201).json(newTool);
});

// update tool
const updateTool = asyncHandler(async (req, res) => {
  const { id } = req.params; // tool id in params (url)
  const { toolId, price, toolType, quantity, name, supplierId } = req.body;

  let tool = await Tool.findById(id);

  // check if tool doesn't exist
  if (!tool) {
    res.status(404);
    throw new Error(`No tool with id: ${id} exists`);
  }

  // Update tool
  const updatedTool = await Tool.update(
    toolId,
    price,
    toolType,
    quantity,
    name,
    supplierId
  );
  res.status(200).json(updatedTool);
});

// delete tool
const deleteTool = asyncHandler(async (req, res) => {
  const tool = await Tool.findById(req.params.id);
  // if tool doesnt exist
  if (!tool) {
    res.status(404);
    throw new Error('Tool not found');
  }
  await Tool.delete(req.params.id);
  res.status(200).json({ message: 'Tool deleted.' });
});

module.exports = {
  getAllTools,
  getTool,
  createNewTool,
  updateTool,
  deleteTool,
};
