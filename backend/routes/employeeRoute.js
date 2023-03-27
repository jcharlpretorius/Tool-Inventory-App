const express = require('express');
const {
  getAllEmployees,
  getEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

const router = express.Router();

router.get('/', getAllEmployees);
router.get('/:id', getEmployee);
router.post('/', createNewEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
// /
// "Employee_ID": 13,
// "FirstName": "Gunther",
// "MiddleInitial": "M",
// "LastName": "Stroud",
// "PhoneNumber": "+3 555-2377",
// "Email": "gunther@gmail.com"
// }
