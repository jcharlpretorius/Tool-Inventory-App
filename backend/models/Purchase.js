const db = require('../config/db');

class Purchase {
  constructor(purchaseId, purchaseDate, salesAssociateId, paymentId) {
    this.purchaseId = purchaseId;
    this.purchaseDate = purchaseDate;
    this.salesAssociateId = salesAssociateId;
    this.paymentId = paymentId;
  }

  // Save to DB
  async create() {
    let sql = `
      INSERT INTO PURCHASE(
        Purchase_ID,
        Purchase_Date,
        Sales_Associate_ID,
        Payment_ID
      )
      VALUES(?,?,?,?)
    `;
    const payload = [
      this.purchaseId,
      this.purchaseDate,
      this.salesAssociateId,
      this.paymentID,
    ];
    const [newPayment, _] = await db.execute(sql, payload);
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
    let sql = `SELECT * FROM PURCHASE WHERE Purchase_ID = ?;`;
    const [purchase, _] = await db.execute(sql, [purchaseId]);
    return purchase[0];
  }
}

module.exports = Purchase;
