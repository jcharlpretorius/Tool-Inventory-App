const db = require('../config/db');

class Employee {
  constructor(firstName, minit, lastName, phoneNumber, address, email) {
    this.firstName = firstName;
    this.minit = minit;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.email = email;
  }

  // Save to DB
  async save() {
    let sql = `
      INSERT INTO EMPLOYEE(
        FirstName,
        MiddleInitial,
        LastName,
        PhoneNumber,
        Address, 
        Email
      )
      VALUES(
        '${this.firstName}',
        '${this.minit}',
        '${this.lastName}',
        '${this.phoneNumber}',
        '${this.address}',
        '${this.email}'
      )
    `;

    // we can use the await syntax because of the pool.promise() in db.js
    const [newEmployee, _] = await db.execute(sql);
    return newEmployee;
  }

  // Find all employees
  static async findAll() {
    let sql = 'SELECT * FROM EMPLOYEE;';

    // destructure to pull out just 1st array, don't want the field data
    const [employees, _] = await db.execute(sql);
    return employees;
  }

  // Find employee by id
  static async findById(employeeId) {
    let sql = `SELECT * FROM EMPLOYEE WHERE Employee_ID = ${employeeId};`;
    const [employee, _] = await db.execute(sql);
    return employee;
  }
}

module.exports = Employee;
