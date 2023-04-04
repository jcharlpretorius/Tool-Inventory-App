const db = require('../config/db');

class Manager {
  constructor(employeeId, salary) {
    this.employeeId = employeeId;
    this.salary = salary;
  }

  // Save to DB
  async create() {
    let sql = `
      INSERT INTO MANAGER(
        Employee_ID,
        Manager_Salary
      )
      VALUES(?,?)
    `;
    const payload = [this.employeeId, this.salary];
    const [newManager, _] = await db.execute(sql, payload);
    return newManager;
  }

  // Find all managers
  static async findAll() {
    let sql = 'SELECT * FROM MANAGER;';

    const [managers, _] = await db.execute(sql);
    return managers;
  }

  // Find manager by id
  static async findById(employeeId) {
    let sql = `SELECT * FROM MANAGER WHERE Employee_ID = ${employeeId};`;
    const [manager, _] = await db.execute(sql);
    return manager[0];
  }

  // Update manager salary
  static async update(employeeId, salary) {
    let sql = `
    UPDATE MANAGER
    SET Manager_Salary = ?
    WHERE Employee_ID = ?
    `;
    await db.execute(sql, [salary]);
    return { employeeId, salary };
  }

  // Delete manager
  static async delete(employeeId) {
    let sql = `DELETE FROM MANAGER WHERE Employee_ID = ?;`;
    await db.execute(sql, [employeeId]);
    return;
  }
}

module.exports = Manager;
