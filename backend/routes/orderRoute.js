const express = require('express');
const router = express.Router();
const { authEmp, authManager } = require('../middleWare/authMiddleware');
const {
  getAllOrders,
  getOrder,
  createNewOrder,
} = require('../controllers/orderController');

router.get('/', getAllOrders);
router.get('/:id', getOrder);
router.post('/', authEmp, createNewOrder);

module.exports = router;
