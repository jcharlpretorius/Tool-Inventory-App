const db = require('../config/db');
const { ROLE } = require('../data/data');

class Employee {
  constructor(
    firstName,
    minit,
    lastName,
    phoneNumber,
    email,
    password,
    role = ROLE.BASIC
  ) {
    this.firstName = firstName;
    this.minit = minit;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
    this.role = role; // default='sales', for authentication/permission levels
  }

  // Save to DB
  async create() {
    let sql = `
      INSERT INTO EMPLOYEE(
        FirstName,
        MiddleInitial,
        LastName,
        PhoneNumber,
        Email,
        Password
      )
      VALUES(?,?,?,?,?,?)
    `;
    const payload = [
      this.firstName,
      this.minit,
      this.lastName,
      this.phoneNumber,
      this.email,
      this.password,
    ];

    // we can use the await syntax because of the pool.promise() in db.js
    const [newEmployee, _] = await db.execute(sql, payload);
    const employeeId = newEmployee.insertId; // extract primary key

    this.employeeId = employeeId;
    return this;
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
    let employeeQuery = `SELECT * FROM EMPLOYEE WHERE Employee_ID = ?;`;
    const [queryResult, employeeFieldData] = await db.execute(employeeQuery, [
      employeeId,
    ]);

    // check if employee exists
    if (!queryResult[0]) {
      throw new Error(`Cannot find employee with id: ${employeeId}`);
    }

    // parse the query result
    const firstName = queryResult[0].FirstName;
    const minit = queryResult[0].MiddleInitial;
    const lastName = queryResult[0].LastName;
    const phoneNumber = queryResult[0].PhoneNumber;
    const email = queryResult[0].email;
    const password = queryResult[0].Password;

    const employee = new Employee(
      firstName,
      minit,
      lastName,
      phoneNumber,
      email,
      password
    );
    // add id attribute
    employee.employeeId = queryResult[0].Employee_ID;
    // set employee's role if they are a manager
    await employee.setRole();
    return employee;
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

    return this.findById(employeeId); // return the entire employee object

    // return { employeeId, firstName, minit, lastName, phoneNumber, email };
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

  // Find employee by email
  static async findByEmail(email) {
    let employeeQuery = `SELECT * FROM EMPLOYEE WHERE Email = ?;`;
    const [queryResult, employeeFieldData] = await db.execute(employeeQuery, [
      email,
    ]);
    // check if employee exists
    if (!queryResult[0]) {
      console.log('employee does not exist');
      throw new Error('Cannot find employee by ID');
    }

    // let employee = this.parseEmployee(queryResult[0]);
    const firstName = queryResult[0].FirstName;
    const minit = queryResult[0].MiddleInitial;
    const lastName = queryResult[0].LastName;
    const phoneNumber = queryResult[0].PhoneNumber;
    const password = queryResult[0].Password;

    const employee = new Employee(
      firstName,
      minit,
      lastName,
      phoneNumber,
      email,
      password
    );
    // add id attribute
    employee.employeeId = queryResult[0].Employee_ID;
    // set employee's role if they are a manager
    await employee.setRole();
    return employee;
  }

  // Get role from database and use it to set the implicit object's role
  async setRole() {
    try {
      // check if employee is a manager
      let sql = `
      SELECT *
      FROM MANAGER
      WHERE Employee_ID = ?;
      `;
      const payload = [this.employeeId];
      const [manager, _] = await db.execute(sql, payload);

      // set employee's role to manager if they are present in manager table
      if (manager[0]) {
        this.role = ROLE.MNGR;
      } else {
        this.role = ROLE.BASIC;
      }
    } catch (err) {
      throw new Error('Could not set employee Role');
    }
  }
}

module.exports = Employee;
