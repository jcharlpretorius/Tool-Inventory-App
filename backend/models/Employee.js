const db = require('../config/db');

class Employee {
  constructor(firstName, minit, lastName, phoneNumber, email) {
    this.firstName = firstName;
    this.minit = minit;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }

  // Save to DB
  async create() {
    let sql = `
      INSERT INTO EMPLOYEE(
        FirstName,
        MiddleInitial,
        LastName,
        PhoneNumber,
        Email
      )
      VALUES(?,?,?,?,?)
    `;
    const payload = [
      this.firstName,
      this.minit,
      this.lastName,
      this.phoneNumber,
      this.email,
    ];

    // we can use the await syntax because of the pool.promise() in db.js
    const [newEmployee, _] = await db.execute(sql, payload);
    const employeeId = newEmployee.insertId; // extract primary key
    // return Employee Object
    return {
      employeeId,
      firstName: this.firstName,
      minit: this.minit,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      email: this.email,
    };
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
    return employee[0];
  }

  // Update employee
  static async update(
    employeeId,
    firstName,
    minit,
    lastName,
    phoneNumber,
    email
  ) {
    let sql = `
    UPDATE EMPLOYEE
    SET FirstName = ?, MiddleInitial = ?, LastName = ?, PhoneNumber = ?, Email = ?
    WHERE Employee_ID = ?
    `;
    const payload = [
      firstName,
      minit,
      lastName,
      phoneNumber,
      email,
      employeeId,
    ];
    await db.execute(sql, payload);
    return { firstName, minit, lastName, phoneNumber, email };
  }

  // Delete Employee
  static async delete(employeeId) {
    let sql = `DELETE FROM EMPLOYEE WHERE Employee_ID = ?;`;
    await db.execute(sql, [employeeId]);
    return;
  }

  // Find email
  static async getEmail(email) {
    let sql = `
    SELECT Email
    FROM EMPLOYEE
    WHERE Email = ?;
    `;
    const payload = [email];
    const [emails, _] = await db.execute(sql, payload);
    return emails;
  }
}

module.exports = Employee;
