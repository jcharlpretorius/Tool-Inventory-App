const asyncHandler = require('express-async-handler');
const Supplier = require('../models/Supplier');
const camelizeKeys = require('../utilities/camelize');

// Get all suppliers
const getAllSuppliers = asyncHandler(async (req, res) => {
  let supplier = await Supplier.findAll();
  // convert keys to camel case
  supplier = camelizeKeys(supplier);
  res.status(200).json(supplier);
});

// Get a single supplier
const getSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);

  // check if supplier doesn't exist
  if (!supplier) {
    res.status(404);
    throw new Error('Supplier not found');
  }

  res.status(200).json(camelizeKeys(supplier));
});

// Create new supplier
const createNewSupplier = asyncHandler(async (req, res) => {
  const { supplierId, name, phoneNumber, address, email } = req.body;

  console.log(`supplierId: ${supplierId}`);
  console.log(`type: ${typeof supplierId}`);
  console.log(`phoneNumber: ${phoneNumber}`);
  // Validation -> check anything you set as NOT NULL in schema
  if (!supplierId) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }
  // do we need additional logic here to validate values recieved from body?
  // Use express validator if you have time
  // verify email is correct format

  // check if supplier  already exits
  // const tempSupplier = await Supplier.findById(supplierId);
  // if (tempSupplier) {
  //   res.status(400);

  //   throw new Error(`Supplier has already been added.`);
  // }

  // Create new supplier
  const supplier = new Supplier(supplierId, name, phoneNumber, address, email);

  const newSupplier = await supplier.create();
  // // check if error
  if (!newSupplier) {
    res.status(400);
    throw new Error('Failed to add supplier');
  }
  res.status(201).json(camelizeKeys(newSupplier));
});

// update supplier information
const updateSupplier = asyncHandler(async (req, res) => {
  const { id } = req.params; // supplier id in params (url)
  let { name, phoneNumber, address, email } = req.body;

  let supplier = await Supplier.findById(id);

  // check if supplier doesn't exist
  if (!supplier) {
    res.status(404);
    throw new Error(`No supplier with id: ${id} exists`);
  }

  // Update supplier
  const updatedSupplier = await Supplier.update(
    id,
    name,
    phoneNumber,
    address,
    email
  );
  res.status(200).json(updatedSupplier);
});

// Delete Supplier

const deleteSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  // if supplier doesnt exist
  if (!supplier) {
    res.status(404);
    throw new Error(`Supplier with id: ${id} not found`);
  }
  await Supplier.delete(req.params.id);
  res.status(200).json({ message: 'Supplier deleted.' });
});

module.exports = {
  getAllSuppliers,
  getSupplier,
  createNewSupplier,
  updateSupplier,
  deleteSupplier,
};
