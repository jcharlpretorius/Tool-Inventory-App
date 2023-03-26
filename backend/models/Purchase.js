const db = require('../config/db');

class Purchase {
  constructor(purchaseId, purchaseDate, salesAssociateId, paymentId) {
    this.purchaseId = purchaseId;
    this.purchaseDate = purchaseDate;
    this.salesAssociateId = salesAssociateId;
    this.paymentId = paymentId;
  }

  // Save to DB
  async save() {
    let sql = `
      INSERT INTO PURCHASE(
        Purchase_ID,
        Purchase_Date,
        Sales_Associate_ID,
        Payment_ID
      )
      VALUES(
        '${this.purchaseId}',
        '${this.purchaseDate}',
        '${this.salesAssociateId}',
        '${this.paymentId}'
      )
    `;

    const [newPayment, _] = await db.execute(sql);
    return newPayment;
  }

  // Find all purchases
  static async findAll() {
    let sql = 'SELECT * FROM PURCHASE;';

    const [purchases, _] = await db.execute(sql);
    return purchases;
  }

  // Find purchase by id
  static async findById(purchaseId) {
    let sql = `SELECT * FROM PURCHASE WHERE Purchase_ID = ${purchaseId};`;
    const [purchase, _] = await db.execute(sql);
    return purchase;
  }
}

module.exports = Purchase;
