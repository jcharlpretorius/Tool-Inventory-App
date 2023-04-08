const db = require('../config/db');

class Payment {
  constructor(paymentType, amount, customerId) {
    this.paymentType = paymentType;
    this.amount = amount;
    this.customerId = customerId;
  }

  // Save to DB
  async create() {
    let sql = `
      INSERT INTO PAYMENT(
        Payment_Type,
        Amount,
        Customer_ID
      )
      VALUES(?,?,?)
    `;
    const payload = [this.paymentType, this.amount, this.customerId];
    const [newPayment, _] = await db.execute(sql, payload);
    const paymentId = newPayment.insertId; // extract primary key from auto increment
    this.paymentId = paymentId;
    return this;
  }

  // Find all payments
  static async findAll() {
    let sql = 'SELECT * FROM PAYMENT;';

    const [payments, _] = await db.execute(sql);
    return payments;
  }

  // Find payment by id
  static async findById(paymentId) {
    let sql = `SELECT * FROM PAYMENT WHERE Payment_ID = ?;`;
    const [queryResult, _] = await db.execute(sql, [paymentId]);

    // check if payment exists
    if (!queryResult[0]) {
      throw new Error(`Cannot find payment with id: ${paymentId}`);
    }
    // parse the query result
    const paymentType = queryResult[0].Payment_Type;
    const amount = queryResult[0].Amount;
    const customerId = queryResult[0].Customer_ID;

    const payment = new Payment(paymentType, amount, customerId);
    payment.paymentId = queryResult[0].Payment_ID;
    return payment;
  }
}

module.exports = Payment;
