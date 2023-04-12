const express = require('express');
const { authEmp, authManager } = require('../middleWare/authMiddleware');
const {
  getAllSuppliers,
  getSupplier,
  createNewSupplier,
  updateSupplier,
  deleteSupplier,
} = require('../controllers/supplierController');

const router = express.Router();

// Only managers can access supplier routes
router.get('/', authEmp, authManager, getAllSuppliers);
router.get('/:id', authEmp, authManager, getSupplier);
router.post('/', authEmp, authManager, createNewSupplier);
router.put('/:id', authEmp, authManager, updateSupplier);
router.delete('/:id', authEmp, authManager, deleteSupplier);

module.exports = router;
