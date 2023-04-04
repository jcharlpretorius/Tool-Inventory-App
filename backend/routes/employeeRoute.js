const express = require('express');
const { authEmp, authManager } = require('../middleWare/authMiddleware');
const {
  getAllEmployees,
  getEmployee,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
  loginEmployee,
  logoutEmployee,
  addPassword,
} = require('../controllers/employeeController');

const router = express.Router();

router.get('/', authEmp, authManager, getAllEmployees);
router.get('/:id', getEmployee);
router.post('/', registerEmployee); // put authManager back in here, removed for testing
router.put('/:id', authEmp, authManager, updateEmployee);
router.delete('/:id', authEmp, authManager, deleteEmployee);
router.post('/login', loginEmployee);
router.get('/logoutEmployee', logoutEmployee);
router.put('/addpassword/:id', addPassword); // temporary route to add password to database

module.exports = router;
