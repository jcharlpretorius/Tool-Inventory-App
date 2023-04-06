const db = require('../config/db');

class Purchase {
  constructor(salesAssociateId, paymentId) {
    this.salesAssociateId = salesAssociateId;
    this.paymentId = paymentId;
  }

  // Save to DB
  async create() {
    // Get current date
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1; // add 1 because month is zero indexed
    let dd = d.getDate(); // day in the year

    this.purchaseDate = `${yyyy}-${mm}--${dd}`;

    let sql = `
      INSERT INTO PURCHASE(
        Purchase_Date,
        Sales_Associate_ID,
        Payment_ID
      )
      VALUES(?,?,?)
    `;

    const payload = [purchaseDate, this.salesAssociateId, this.paymentID];
    const [newPayment, _] = await db.execute(sql, payload);
    const purchaseId = newPayment.insertId; // extract primary key
    this.purchaseId = purchaseId;

    return this;
  }

  // Find all purchases
  static async findAll() {
    let sql = 'SELECT * FROM PURCHASE;';

    const [purchases, _] = await db.execute(sql);
    return purchases;
  }

  // Find purchase by id
  static async findById(id) {
    let sql = `SELECT * FROM PURCHASE WHERE Purchase_ID = ?;`;
    const [queryResult, _] = await db.execute(sql, [id]);

    // check if purchase exists
    if (!queryResult[0]) {
      throw new Error(`Cannot find purchase with id: ${id}`);
    }

    // parse the query result
    const purchaseDate = queryResult[0].Purcase_Date;
    const salesAssociateId = queryResult[0].Sales_Associate_ID;
    const paymentId = queryResult[0].Payment_ID;
    const purchaseId = queryResult[0].Purchase_ID;

    const purchase = new Purchase(salesAssociateId, paymentId);
    // set id and date
    purchase.purchaseDate = purchaseDate;
    purchase.purchaseId = purchaseId;
    return purchase;
  }

  // Delete Purchase
  static async delete(purchaseId) {
    let sql = `DELETE FROM PURCHASE WHERE Purchase_ID = ?;`;
    await db.execute(sql, [purchaseId]);
    return;
  }

  // maybe add some kind of query to get purchases based on the date?
}

module.exports = Purchase;
