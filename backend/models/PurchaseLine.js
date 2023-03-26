const db = require('../config/db');

class PurchaseLine {
  constructor(purchaseId, lineNumber, toolId, quantity) {
    this.purchaseId = purchaseId;
    this.toolId = toolId;
    this.lineNumber = lineNumber;
    this.quantity = quantity;
  }

  // Save to DB
  async save() {
    let sql = `
      INSERT INTO PURCHASE_LINE(
        Purchase_ID,
        Line_Number,
        Tool_ID,
        Quantity
      )
      VALUES(
        '${this.purchaseId}',
        '${this.lineNumber}',
        '${this.toolId}',
        '${this.quantity}'
      )
    `;

    const [newPurchaseLine, _] = await db.execute(sql);
    return newPurchaseLine;
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
    let sql = `SELECT * FROM PURCHASE_LINE WHERE Purchase_ID = ${purchaseId};`;
    const [purchaseLines, _] = await db.execute(sql);
    return purchaseLines;
  }
}

module.exports = PurchaseLine;
