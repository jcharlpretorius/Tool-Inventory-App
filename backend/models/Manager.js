const db = require('../config/db');

class Manager {
  constructor(employeeId, salary) {
    this.employeeId = employeeId;
    this.salary = salary;
  }

  // Save to DB
  async save() {
    let sql = `
      INSERT INTO MANAGER(
        Employee_ID,
        Manager_Salary
      )
      VALUES(
        '${this.employeeId}',
        '${this.salary}'
      )
    `;

    const [newManager, _] = await db.execute(sql);
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
    return manager;
  }
}

module.exports = Manager;
