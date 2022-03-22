const db = require('../../data/db-config');

const getAll = () => {
  return db('cars');
}

const getById = async (id) => {
  return await db('cars').where({ id });
}

const create = async (car) => {
  const [id] = await db('cars').insert(car);
  return getById(id);
}

module.exports = {
  getAll,
  getById,
  create
}
