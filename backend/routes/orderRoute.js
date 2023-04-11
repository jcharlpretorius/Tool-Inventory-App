const express = require('express');
const router = express.Router();
const { authEmp, authManager } = require('../middleWare/authMiddleware');
const {
  getAllOrders,
  getOrder,
  createNewOrder,
} = require('../controllers/orderController');

router.get('/', authEmp, authManager, getAllOrders);
router.get('/:id', authEmp, authManager, getOrder);
router.post('/', authEmp, authManager, createNewOrder);

module.exports = router;
