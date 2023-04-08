const express = require('express');
const router = express.Router();
const { authEmp, authManager } = require('../middleWare/authMiddleware');
const {
  getAllPurchases,
  getPurchase,
  createNewPurchase,
} = require('../controllers/purchaseController');

router.get('/', getAllPurchases); // maybe make manager protected?
router.get('/:id', getPurchase);
router.post('/', authEmp, createNewPurchase); // does payment, purchase, and purchase lines

module.exports = router;
