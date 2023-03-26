const db = require('../config/db');

class SalesAssociate {
  constructor(employeeId, commission) {
    this.employeeId = employeeId;
    this.commission = commission;
  }

  // Save to DB
  async save() {
    let sql = `
      INSERT INTO SALES_ASSOCIATE(
        Employee_ID,
        Commission_Rate
      )
      VALUES(
        '${this.employeeId}',
        '${this.commission}'
      )
    `;

    const [newSaleAssociate, _] = await db.execute(sql);
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
    return salesAssociate;
  }
}

module.exports = SalesAssociate;
