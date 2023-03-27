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
  async create() {
    const sql = `
      INSERT INTO CUSTOMER(
        FirstName,
        MiddleInitial,
        LastName,
        Address, 
        Email
      )
      VALUES(
        ?,?,?,?,?
      )
    `;
    const payload = [
      this.firstName,
      this.minit,
      this.lastName,
      this.address,
      this.email,
    ];
    // we can use the await syntax because of the pool.promise() in db.js
    const [newCustomer, _] = await db.execute(sql, payload);
    const customerId = newCustomer.insertId; // extract primary key
    // return customer object
    return {
      customerId,
      firstName: this.firstName,
      minit: this.minit,
      lastName: this.lastName,
      address: this.address,
      email: this.email,
    };
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
    let sql = `SELECT * FROM CUSTOMER WHERE Customer_ID = ?;`;
    const [customer, _] = await db.execute(sql, [customerId]);
    return customer[0];
  }

  // Update customer
  static async update(customerId, firstName, minit, lastName, address, email) {
    let sql = `
    UPDATE CUSTOMER
    SET FirstName = ?, MiddleInitial = ?, LastName = ?, Address = ?, Email = ?
    WHERE Customer_ID = ?
    `;
    const payload = [firstName, minit, lastName, address, email, customerId];
    const [newCustomer, _] = await db.execute(sql, payload);
    return { firstName, minit, lastName, address, email };
  }

  // Delete Customer -> I don't think we actually need this
  static async delete(customerId) {
    let sql = `DELETE FROM CUSTOMER WHERE Customer_ID = ?;`;
    await db.execute(sql, [customerId]);
    return;
  }

  // Find email
  static async getEmail(email) {
    let sql = `
    SELECT Email
    FROM CUSTOMER
    WHERE Email = ?;
    `;
    const payload = [email];
    const [emails, _] = await db.execute(sql, payload);
    return emails;
  }
}

module.exports = Customer;
