const express = require('express');
const {
  getAllCustomers,
  getCustomer,
  createNewCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');

const router = express.Router();

router.get('/', getAllCustomers);
router.get('/:id', getCustomer);
router.post('/', createNewCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;
