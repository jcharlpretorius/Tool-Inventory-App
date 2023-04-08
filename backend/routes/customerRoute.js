const express = require('express');
const { authEmp, authManager } = require('../middleWare/authMiddleware');
const {
  getAllCustomers,
  getCustomer,
  getCustomerByEmail,
  createNewCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');

const router = express.Router();
// Only managers can delete a customer
router.get('/', authEmp, getAllCustomers);
router.post('/email', authEmp, getCustomerByEmail);
router.get('/:id', authEmp, getCustomer);
router.post('/', authEmp, createNewCustomer);
router.put('/:id', authEmp, updateCustomer);
router.delete('/:id', authEmp, authManager, deleteCustomer);

module.exports = router;
