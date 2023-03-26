const db = require('../config/db');

class Supplier {
  constructor(supplierId, phone, address) {
    this.supplierId = supplierId;
    this.phone = phone;
    this.address = address;
  }

  // Save to DB
  async save() {
    let sql = `
      INSERT INTO SUPPLIER(
        Supplier_ID,
        Phone,
        Address
      )
      VALUES(
        '${this.supplierId}',
        '${this.phone}',
        '${this.address}'
      )
    `;

    const [newSupplier, _] = await db.execute(sql);
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
    let sql = `SELECT * FROM SUPPLIER WHERE Supplier_ID = ${supplierId};`;
    const [supplier, _] = await db.execute(sql);
    return supplier;
  }
}

module.exports = Supplier;
