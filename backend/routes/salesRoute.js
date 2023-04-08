const express = require('express');
const router = express.Router();
const { authEmp, authManager } = require('../middleWare/authMiddleware');
const {
  getRecentSales,
  getTopSalesMen,
} = require('../controllers/salesController');

router.get('/recent', authEmp, getRecentSales); // maybe make manager protected eventually
router.get('/top', authEmp, getTopSalesMen);

module.exports = router;
