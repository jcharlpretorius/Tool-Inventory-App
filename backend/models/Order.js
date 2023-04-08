const db = require('../config/db');

class Order {
  constructor(managerId) {
    this.managerId = managerId;
  }

  // Save to DB
  async create() {
    // Get current date
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1; // add 1 because month is zero indexed
    let dd = d.getDate(); // day in the year
    // concatenate 0 infront of month and date if required
    mm = ('0' + mm).slice(-2);
    dd = ('0' + dd).slice(-2);
    this.orderDate = `${yyyy}-${mm}-${dd}`;

    let sql = `
      INSERT INTO ORDER(
        Order_Date,
        Manager_ID
      )
      VALUES(?,?)
    `;
    const payload = [this.orderDate, this.managerId];
    const [newOrder, _] = await db.execute(sql, payload);
    const orderId = newOrder.insertId; // extract primary key
    this.orderId = orderId;

    return this;
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
    const [queryResult, _] = await db.execute(sql, [orderId]);

    // check if order exists
    if (!queryResult[0]) {
      throw new Error(`Cannot find order with id: ${orderId}`);
    }

    // parse the query result
    // const orderId = queryResult[0].Order_ID;
    const orderDate = queryResult[0].Order_Date;
    const managerId = queryResult[0].Manager_ID;

    const order = new Order(managerId);
    // set orderId and date
    order.orderDate = orderDate;
    order.orderId = orderId;

    return this;
  }

  // Delete Order
  static async delete(orderId) {
    let sql = `DELETE FROM ORDER WHERE Order_ID = ?;`;
    await db.execute(sql, [orderId]);
    return;
  }
}

module.exports = Order;
