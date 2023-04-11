const db = require('../config/db');

class OrderLine {
  constructor(orderId, lineNumber, toolId, quantity) {
    this.orderId = orderId;
    this.lineNumber = lineNumber;
    this.toolId = toolId;
    this.quantity = quantity;
  }

  // Save to DB
  async create() {
    let sql = `
      INSERT INTO ORDER_LINE(
        Order_ID,
        Line_Number,
        Tool_ID,
        Quantity
      )
      VALUES(?,?,?,?)
    `;
    const payload = [this.orderId, this.lineNumber, this.toolId, this.quantity];
    const [newOrderLine, _] = await db.execute(sql, payload);
    return this;
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
    let sql = `SELECT * FROM ORDER_LINE WHERE Order_ID =?};`;
    const [queryResult, _] = await db.execute(sql, [orderId]);

    // parse the query result
    const lineNumber = queryResult[0].Line_Number;
    const toolId = queryResult[0].Tool_ID;
    const quantity = queryResult[0].Quantity;

    const orderLine = new OrderLine(orderId, lineNumber, toolId, quantity);
    return orderLine;
  }
}

module.exports = OrderLine;
