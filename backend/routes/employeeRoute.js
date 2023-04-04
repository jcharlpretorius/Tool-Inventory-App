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

router.get('/', authEmp, authManager, getAllEmployees); // protected just for testing, can remove auth middleware here
router.get('/getemployee', authEmp, getEmployee);
router.put('/:id', authEmp, authManager, updateEmployee);
router.delete('/:id', authEmp, authManager, deleteEmployee);
router.post('/register', authEmp, authManager, registerEmployee);
router.post('/login', loginEmployee);
router.get('/logout', logoutEmployee);
// router.put('/addpassword/:id', addPassword); // temporary route to get password hash to update database dummy values

module.exports = router;
