const db = require('../config/db');

class Customer {
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }

  // Save to DB
  async save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1; // add 1 because month is zero indexed
    let dd = d.getDate(); // day in the year

    let createdAtDate = `${yyyy}-${mm}--${dd}`;
    let sql = `
      INSERT INTO CUSTOMER(
        title, 
        body,
        created_at
      )
      VALUES(
        '${this.title}',
        '${this.body}',
        '${createdAtDate}'
      )
    `;

    // we can use the await syntax because of the pool.promise() in db.js
    // destructure it. Code changed, removed the async (40:40 in tutorial)
    // const [newPost, _] = await db.execute(sql);
    // return newPost;
    return await db.execute(sql);
  }

  static async findAll() {
    let sql = 'SELECT * FROM posts;';
    // not going to make this an asyn function. Just going to return a promise
    // and handle it (from there? where, in postController?)

    // destructure to pull out just 1st array, don't want field data
    const [posts, _] = await db.execute(sql);
    return posts;
  }

  static async findById(id) {
    let sql = `SELECT * FROM posts WHERE id = ${id};`;

    return await db.execute(sql); // return the promise
  }
}

module.exports = Customer;
