const db = require('../config/db');

class Order {
  constructor(orderId, orderDate, managerId) {
    this.orderId = orderId;
    this.orderDate = orderDate;
    this.managerId = managerId;
  }

  // Save to DB
  async create() {
    let sql = `
      INSERT INTO ORDER(
        Order_ID,
        Order_Date,
        Manager_ID
      )
      VALUES(?,?,?)
    `;
    const paylod = [this.orderId, this.orderDate, this.managerId];
    const [newOrder, _] = await db.execute(sql, payload);
    return newOrder;
  }

  // Find all orders
  static async findAll() {
    let sql = 'SELECT * FROM ORDER;';

    const [orders, _] = await db.execute(sql);
    return orders;
  }

  // Find order by id
  static async findById(orderId) {
    let sql = `SELECT * FROM ORDER WHERE Order_ID =?};`;
    const [order, _] = await db.execute(sql, [orderId]);
    return order[0];
  }
}

module.exports = Order;
