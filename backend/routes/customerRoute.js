const express = require('express');
const {
  getAllCustomers,
  getCustomer,
  getCustomerByEmail,
  createNewCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');

const router = express.Router();

router.get('/', getAllCustomers);
router.post('/email', getCustomerByEmail);
router.get('/:id', getCustomer);
router.post('/', createNewCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;
