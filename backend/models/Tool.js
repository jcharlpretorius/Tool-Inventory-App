const db = require('../config/db');

class Tool {
  constructor(toolId, price, toolType, quantity, name, supplierId) {
    this.toolId = toolId;
    this.price = price;
    this.toolType = toolType;
    this.quantity = quantity;
    this.name = name;
    this.supplierId = supplierId;
  }

  // Save to DB
  async save() {
    let sql = `
      INSERT INTO TOOL(
        Tool_ID,
        Price,
        Tool_Type,
        Quantity_In_Stock,
        Name,
        Supplier_ID
      )
      VALUES(
        '${this.toolId}',
        '${this.price}',
        '${this.toolType}',
        '${this.quantity}',
        '${this.name}',
        '${this.supplierId}'
      )
    `;

    const [newTool, _] = await db.execute(sql);
    return newTool;
  }

  // Find all tools
  static async findAll() {
    let sql = 'SELECT * FROM TOOL;';

    const [tools, _] = await db.execute(sql);
    return tools;
  }

  // Find tool by id
  static async findById(toolId) {
    let sql = `SELECT * FROM TOOL WHERE Tool_ID = ${toolId};`;
    const [tool, _] = await db.execute(sql);
    return tool;
  }
}

module.exports = Tool;
