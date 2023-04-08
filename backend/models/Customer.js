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
        First_Name,
        Minit,
        Last_Name,
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
    this.customerId = newCustomer.insertId; // extract primary key from auto increment
    return this;
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
    const [queryResult, _] = await db.execute(sql, [customerId]);
    // return customer[0];
    // check if customer exists
    if (!queryResult[0]) {
      throw new Error(`Cannot find customer with id: ${customerId}`);
    }

    // parse the query result
    const firstName = queryResult[0].First_Name;
    const minit = queryResult[0].Minit;
    const lastName = queryResult[0].Last_Name;
    const address = queryResult[0].Address;
    const email = queryResult[0].Email;

    const customer = new Customer(firstName, minit, lastName, address, email);
    // add id attribute
    customer.customerId = queryResult[0].Customer_ID;
    return customer;
  }

  // Update customer
  static async update(customerId, firstName, minit, lastName, address, email) {
    let sql = `
    UPDATE CUSTOMER
    SET First_Name = ?, Minit = ?, Last_Name = ?, Address = ?, Email = ?
    WHERE Customer_ID = ?
    `;
    const payload = [firstName, minit, lastName, address, email, customerId];
    await db.execute(sql, payload);
    // construct customer object to return
    const customer = new Customer(firstName, minit, lastName, address, email);
    customer.customerId = customerId;
    return customer;
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

  // Find customer by email
  static async findByEmail(email) {
    let customerQuery = `SELECT * FROM CUSTOMER WHERE Email = ?;`;
    const [queryResult, customerFieldData] = await db.execute(customerQuery, [
      email,
    ]);
    // check if customer exists
    if (!queryResult[0]) {
      console.log('Customer does not exist');
      throw new Error(`Cannot find customer with email ${email}`);
    }

    const firstName = queryResult[0].First_Name;
    const minit = queryResult[0].Minit;
    const lastName = queryResult[0].Last_Name;
    const address = queryResult[0].Address;

    const customer = new Customer(firstName, minit, lastName, address, email);
    // add id attribute
    customer.customerId = queryResult[0].Customer_ID;
    return customer;
  }
}

module.exports = Customer;
