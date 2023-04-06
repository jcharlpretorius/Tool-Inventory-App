const express = require('express');
const router = express.Router();
const { authEmp, authManager } = require('../middleWare/authMiddleware');
const {
  getAllTools,
  getTool,
  createNewTool,
  updateTool,
  deleteTool,
} = require('../controllers/toolController');

router.get('/', getAllTools);
router.get('/:id', getTool);
router.post('/', authEmp, authManager, createNewTool); //
router.put('/:id', authEmp, authManager, updateTool);
router.delete('/:id', authEmp, authManager, deleteTool);

module.exports = router;
