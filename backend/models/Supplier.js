const db = require('../config/db');

class Supplier {
  constructor(supplierId, phone, address) {
    this.supplierId = supplierId;
    this.phone = phone;
    this.address = address;
  }

  // Save to DB
  async create() {
    let sql = `
      INSERT INTO SUPPLIER(
        Supplier_ID,
        Phone,
        Address
      )
      VALUES(?,?,?)
    `;
    const payload = [this.supplierId, this.phone, this.address];
    const [newSupplier, _] = await db.execute(sql, payload);
    return newSupplier;
  }

  // Find all suppliers
  static async findAll() {
    let sql = 'SELECT * FROM SUPPLIER;';

    const [suppliers, _] = await db.execute(sql);
    return suppliers;
  }

  // Find supplier by id
  static async findById(supplierId) {
    let sql = `SELECT * FROM SUPPLIER WHERE Supplier_ID = ?;`;
    const [queryResult, _] = await db.execute(sql[supplierId]);
    // parse the query result

    const supplierId = queryResult[0].Supplier_ID;
    const phone = queryResult[0].Phone;
    const address = queryResult[0].Address;

    return new Supplier(supplierId, phone, address);
  }

  // Update supplier
  static async update(supplierId, phone, address) {
    let sql = `
    UPDATE SUPPLIER
    SET 
    Phone = ?, 
    Address = ?
    WHERE Supplier_ID = ?
    `;
    const payload = [phone, address, supplierId];
    await db.execute(sql, payload);
    return new Supplier(supplierId, phone, address);
  }

  // Delete supplier
  static async delete(supplierId) {
    let sql = `DELETE FROM SUPPLIER WHERE Supplier_ID = ?;`;
    await db.execute(sql, [supplierId]);
    return;
  }
}

module.exports = Supplier;
