const express = require('express');
const { authEmp, authManager } = require('../middleWare/authMiddleware');
const {
  getAllTools,
  getTool,
  createNewTool,
  updateTool,
  deleteTool,
} = require('../controllers/toolController');

const router = express.Router();

// Must be logged in. Only managers can create, edit, or delete tools
router.get('/', authEmp, getAllTools);
router.get('/:id', authEmp, getTool);
router.post('/', authEmp, authManager, createNewTool);
router.put('/:id', authEmp, authManager, updateTool);
router.delete('/:id', authEmp, authManager, deleteTool);

module.exports = router;
