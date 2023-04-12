const db = require('../config/db');

class Supplier {
  constructor(supplierId, name, phoneNumber, address, email) {
    this.supplierId = supplierId;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.email = email;
  }

  // Save to DB ????????????????????????? fix everything in backend to add email and name
  async create() {
    let sql = `
      INSERT INTO SUPPLIER(
        Supplier_ID,
        Name,
        Phone_Number,
        Address,
        Email
      )
      VALUES(?,?,?,?,?)
    `;
    const payload = [
      this.supplierId,
      this.name,
      this.phoneNumber,
      this.address,
      this.email,
    ];
    try {
      const [newSupplier, _] = await db.execute(sql, payload);
    } catch (error) {
      return null;
    }

    return this;
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
    const [queryResult, _] = await db.execute(sql, [supplierId]);
    // parse the query result

    // check if supplier exists
    if (!queryResult[0]) {
      throw new Error(`Cannot find Supplier with id ${supplierId}`);
    }

    const name = queryResult[0].Name;
    const phoneNumber = queryResult[0].Phone_Number;
    const address = queryResult[0].Address;
    const email = queryResult[0].Email;

    return new Supplier(supplierId, name, phoneNumber, address, email);
  }

  // Update supplier
  static async update(supplierId, name, phoneNumber, address, email) {
    let sql = `
    UPDATE SUPPLIER
    SET 
    Name = ?, 
    Phone_Number = ?, 
    Address = ?,
    Email = ?
    WHERE Supplier_ID = ?
    `;
    const payload = [name, phoneNumber, address, email, supplierId];
    await db.execute(sql, payload);
    return new Supplier(supplierId, name, phoneNumber, address, email);
  }

  // Delete supplier
  static async delete(supplierId) {
    let sql = `DELETE FROM SUPPLIER WHERE Supplier_ID = ?;`;
    await db.execute(sql, [supplierId]);
    return;
  }
}

module.exports = Supplier;
