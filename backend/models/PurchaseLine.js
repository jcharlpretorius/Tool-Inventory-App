const db = require('../config/db');

class PurchaseLine {
  constructor(purchaseId, lineNumber, toolId, quantity) {
    this.purchaseId = purchaseId;
    this.toolId = toolId;
    this.lineNumber = lineNumber;
    this.quantity = quantity;
  }

  // Save to DB
  async create() {
    let sql = `
      INSERT INTO PURCHASE_LINE(
        Purchase_ID,
        Line_Number,
        Tool_ID,
        Quantity
      )
      VALUES(?,?,?,?)
    `;
    const payload = [
      this.purchaseId,
      this.lineNumber,
      this.toolId,
      this.quantity,
    ];
    const [newPurchaseLine, _] = await db.execute(sql, payload);
    return this;
  }

  // Find all allPurchaseLines in table
  static async findAll() {
    let sql = 'SELECT * FROM PURCHASE_LINE;';

    const [allPurchaseLines, _] = await db.execute(sql);
    return allPurchaseLines;
  }

  // Find Purchase Lines by Purchase_ID
  // Can be several purchase lines associated with a single purchase_ID
  static async findById(purchaseId) {
    let sql = `SELECT * FROM PURCHASE_LINE WHERE Purchase_ID ?;`;
    const [queryResult, _] = await db.execute(sql, [purchaseId]);

    // parse the query result
    const lineNumber = queryResult[0].Line_Number;
    const toolId = queryResult[0].Tool_ID;
    const quantity = queryResult[0].Quantity;

    const purchaseLine = new PurchaseLine(
      purchaseId,
      lineNumber,
      toolId,
      quantity
    );
    return purchaseLine;
  }
}

module.exports = PurchaseLine;
