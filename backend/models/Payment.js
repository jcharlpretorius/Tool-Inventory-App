const db = require('../config/db');

class Payment {
  constructor(paymentId, paymentType, amount, customerId) {
    this.paymentId = paymentId;
    this.paymentType = paymentType;
    this.amount = amount;
    this.customerId = customerId;
  }

  // Save to DB
  async save() {
    let sql = `
      INSERT INTO PAYMENT(
        Payment_ID,
        Payment_Type,
        Amount,
        Customer_ID
      )
      VALUES(
        '${this.paymentId}',
        '${this.paymentType}',
        '${this.amount}',
        '${this.customerId}'
      )
    `;

    const [newPayment, _] = await db.execute(sql);
    return newPayment;
  }

  // Find all payments
  static async findAll() {
    let sql = 'SELECT * FROM PAYMENT;';

    const [payments, _] = await db.execute(sql);
    return payments;
  }

  // Find payment by id
  static async findById(paymentId) {
    let sql = `SELECT * FROM PAYMENT WHERE Payment_ID = ${paymentId};`;
    const [payment, _] = await db.execute(sql);
    return payment;
  }
}

module.exports = Payment;
