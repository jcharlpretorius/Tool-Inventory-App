const db = require('../config/db');

class SalesAssociate {
  constructor(employeeId, commission = 0) {
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
    return this;
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
    const [queryResult, _] = await db.execute(sql);

    // check if salesAssociate exists
    if (!queryResult[0]) {
      throw new Error(`Cannot find sales associate with id: ${employeeId}`);
    }

    // parse the query result
    const commission = queryResult[0].Commission_Rate;

    const sa = new SalesAssociate(employeeId, commission);

    return sa;
  }

  // Update sales associate commission
  static async update(employeeId, commission) {
    let sql = `
    UPDATE SALES_ASSOCIATE
    SET Commission_Rate = ?
    WHERE Commission_Rate = ?
    `;
    await db.execute(sql, [commission]);
    return { employeeId, commission }; // same thing as if we constructed a new SA
  }

  // Delete sales associate
  static async delete(employeeId) {
    let sql = `DELETE FROM SALES_ASSOCIATE WHERE Employee_ID = ?;`;
    await db.execute(sql, [employeeId]);
    return;
  }
}

module.exports = SalesAssociate;
