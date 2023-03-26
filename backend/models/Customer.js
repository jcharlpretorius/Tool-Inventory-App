const db = require('../config/db');

class Customer {
  constructor(firstName, minit, lastName, address, email) {
    this.firstName = firstName;
    this.minit = minit;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
  }

  // Save to DB
  async save() {
    let sql = `
      INSERT INTO CUSTOMER(
        FirstName,
        MiddleInitial,
        LastName,
        Address, 
        Email
      )
      VALUES(
        '${this.firstName}',
        '${this.minit}',
        '${this.lastName}',
        '${this.address}',
        '${this.email}'
      )
    `;

    // we can use the await syntax because of the pool.promise() in db.js
    const [newCustomer, _] = await db.execute(sql);
    return newCustomer;
  }

  // Find all customers
  static async findAll() {
    let sql = 'SELECT * FROM CUSTOMER;';

    // destructure to pull out just 1st array, don't want the field data
    const [customers, _] = await db.execute(sql);
    return customers;
  }

  // Find customer by id
  static async findById(customerId) {
    let sql = `SELECT * FROM CUSTOMER WHERE Customer_ID = ${customerId};`;
    const [customer, _] = await db.execute(sql);
    return customer;
  }
}

module.exports = Customer;
