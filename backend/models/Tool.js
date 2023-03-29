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
        Quantity_In_Stock,
        Name,
        Supplier_ID
      )
      VALUES(?,?,?,?,?,?)
    `;
    const paylod = [
      this.toolId,
      this.price,
      this.toolType,
      this.quantity,
      this.name,
      this.supplierId,
    ];
    const [newTool, _] = await db.execute(sql);
    return newTool;
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
    const [tool, _] = await db.execute(sql, [toolId]);
    return tool[0];
  }
  // Update tool
  static async update(toolId, price, toolType, quantity, name, supplierId) {
    let sql = `
    UPDATE TOOL
    SET 
    Price = ?, 
    Tool_Type = ?, 
    Quantity_In_Stock = ?, 
    Name = ?, 
    Supplier_ID = ?, 
    WHERE Tool_ID = ?
    `;
    const payload = [price, toolType, quantity, name, supplierId, toolId];
    await db.execute(sql, payload);
    return { toolId, price, toolType, quantity, name, supplierId };
  }

  // Delete tool
  static async delete(toolId) {
    let sql = `DELETE FROM TOOL WHERE Tool_ID = ?;`;
    await db.execute(sql, [toolId]);
    return;
  }
}

module.exports = Tool;
