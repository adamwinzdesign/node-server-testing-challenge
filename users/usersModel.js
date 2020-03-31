const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db('users').select('id', 'username', 'role')
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user);
}

function findById(id) {
  return db('users')
    .where({ id })
    .select('username', 'department', 'role')
    .first();
}
