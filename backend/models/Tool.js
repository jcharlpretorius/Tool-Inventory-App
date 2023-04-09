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
  async create() {
    let sql = `
      INSERT INTO TOOL(
        Tool_ID,
        Price,
        Tool_Type,
        Quantity,
        Name,
        Supplier_ID
      )
      VALUES(?,?,?,?,?,?)
    `;
    const payload = [
      this.toolId,
      this.price,
      this.toolType,
      this.quantity,
      this.name,
      this.supplierId,
    ];
    const [newTool, _] = await db.execute(sql, payload);

    return this;
  }

  // Find all tools
  static async findAll() {
    let sql = 'SELECT * FROM TOOL;';

    const [tools, _] = await db.execute(sql);
    return tools; // return a list of tools
  }

  // Find tool by id
  static async findById(toolId) {
    let sql = `
    SELECT * 
    FROM TOOL 
    WHERE Tool_ID = ?;`;
    const [queryResult, _] = await db.execute(sql, [toolId]);

    // check if purchase exists
    if (!queryResult[0]) {
      throw new Error(`Cannot find tool with id: ${toolId}`);
    }

    // parse the query result
    const price = queryResult[0].Price;
    const toolType = queryResult[0].Tool_Type;
    const quantity = queryResult[0].Quantity;
    const name = queryResult[0].Name;
    const supplierId = queryResult[0].Supplier_ID;

    return new Tool(toolId, price, toolType, quantity, name, supplierId);
  }
  // Update entire tool
  static async update(toolId, price, toolType, quantity, name, supplierId) {
    let sql = `
    UPDATE TOOL
    SET 
    Price = ?, 
    Tool_Type = ?, 
    Quantity = ?, 
    Name = ?, 
    Supplier_ID = ?
    WHERE Tool_ID = ?
    `;
    const payload = [price, toolType, quantity, name, supplierId, toolId];
    await db.execute(sql, payload);
    return new Tool(toolId, price, toolType, quantity, name, supplierId);
  }

  // Delete tool
  static async delete(toolId) {
    let sql = `DELETE FROM TOOL WHERE Tool_ID = ?;`;
    await db.execute(sql, [toolId]);
    return;
  }

  // Update tool quantity
  static async updateQuantity(toolId, quantity) {
    let sql = `
    UPDATE TOOL
    SET 
    Quantity = ?
    WHERE Tool_ID = ?
    `;
    const payload = [quantity, toolId];
    await db.execute(sql, payload);
    return;
  }
}

module.exports = Tool;
