const db = require('../config/db');

class SalesAssociate {
  constructor(employeeId, commission) {
    this.employeeId = employeeId;
    this.commission = commission;
  }

  // Save to DB
  async create() {
    let sql = `
      INSERT INTO SALES_ASSOCIATE(
        Employee_ID,
        Commission_Rate
      )
      VALUES(?,?)
    `;
    const payload = [this.employeeId, this.commission];
    const [newSaleAssociate, _] = await db.execute(sql, payload);
    return newSaleAssociate;
  }

  // Find all salesAssociates
  static async findAll() {
    let sql = 'SELECT * FROM SALES_ASSOCIATE;';

    const [salesAssociates, _] = await db.execute(sql);
    return salesAssociates;
  }

  // Find salesAssociate by id
  static async findById(employeeId) {
    let sql = `SELECT * FROM SALES_ASSOCIATE WHERE Employee_ID = ${employeeId};`;
    const [salesAssociate, _] = await db.execute(sql);
    return salesAssociate[0];
  }

  // Update sales associate commission
  static async update(employeeId, commission) {
    let sql = `
    UPDATE SALES_ASSOCIATE
    SET Commission_Rate = ?
    WHERE Employee_ID = ?
    `;
    await db.execute(sql, [commission]);
    return { employeeId, commission };
  }

  // Delete sales associate
  static async delete(employeeId) {
    let sql = `DELETE FROM SALES_ASSOCIATE WHERE Employee_ID = ?;`;
    await db.execute(sql, [employeeId]);
    return;
  }
}

module.exports = SalesAssociate;
