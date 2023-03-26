const db = require('../config/db');

class OrderLine {
  constructor(orderId, lineNumber, toolId, quantity) {
    this.orderId = orderId;
    this.lineNumber = lineNumber;
    this.toolId = toolId;
    this.quantity = quantity;
  }

  // Save to DB
  async save() {
    let sql = `
      INSERT INTO ORDER_LINE(
        Order_ID,
        Line_Number,
        Tool_ID,
        Quantity
      )
      VALUES(
        '${this.orderId}',
        '${this.lineNumber}',
        '${this.toolId}',
        '${this.quantity}'
      )
    `;

    const [newPurchaseLine, _] = await db.execute(sql);
    return newPurchaseLine;
  }

  // Find all allOrderLines in table
  static async findAll() {
    let sql = 'SELECT * FROM ORDER_LINE;';

    const [allOrderLines, _] = await db.execute(sql);
    return allOrderLines;
  }

  // Find order Lines by orderId
  // Can be several order lines associated with a single orderId
  static async findById(orderId) {
    let sql = `SELECT * FROM ORDER_LINE WHERE Order_ID = ${orderId};`;
    const [orderLines, _] = await db.execute(sql);
    return orderLines;
  }
}

module.exports = OrderLine;
