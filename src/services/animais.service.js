const pool = require('../../db');

const buscarTodos = async () => {
  const result = await pool.query('SELECT * FROM animais ORDER BY id');
  return result.rows;
};

const buscarPorId = async (id) => {
  const result = await pool.query('SELECT * FROM animais WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (animal) => {
  const { nome, especie, raca, data_nascimento, tutor_id } = animal;
  const result = await pool.query(
    'INSERT INTO animais (nome, especie, raca, data_nascimento, tutor_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nome, especie, raca, data_nascimento, tutor_id]
  );
  return result.rows[0];
};

const update = async (id, animal) => {
  const { nome, especie, raca, data_nascimento, tutor_id } = animal;
  const result = await pool.query(
    'UPDATE animais SET nome = $1, especie = $2, raca = $3, data_nascimento = $4, tutor_id = $5 WHERE id = $6 RETURNING *',
    [nome, especie, raca, data_nascimento, tutor_id, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  await pool.query('DELETE FROM animais WHERE id = $1', [id]);
};

module.exports = { buscarTodos, buscarPorId, create, update, remove };
