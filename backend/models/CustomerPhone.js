const db = require('../config/db');

class CustomerPhone {
  constructor(customerId, phoneNumber) {
    this.customerId = customerId;
    this.phoneNumber = phoneNumber;
  }

  // Save to DB
  async create() {
    let sql = `
      INSERT INTO CUSTOMER_PHONE_NUMBERS(
        Customer_ID,
        PhoneNumber,
      )
      VALUES(?,?)
    `;
    const payload = [this.customerId, this.phoneNumber];
    const [newPhoneNumber, _] = await db.execute(sql, payload);
    return newPhoneNumber;
  }

  // Find all customerPhones
  static async findAll() {
    let sql = 'SELECT * FROM CUSTOMER_PHONE_NUMBERS;';

    const [allCustomerPhones, _] = await db.execute(sql);
    return allCustomerPhones;
  }

  // Find phone numbers by customer id
  // Customers can have multiple phone numbers
  static async findById(customerId) {
    let sql = `SELECT * FROM CUSTOMER_PHONE_NUMBERS WHERE Customer_ID = ?`;
    const [customerPhones, _] = await db.execute(sql, [customerId]);
    return customerPhones[0];
  }
}

module.exports = CustomerPhone;
