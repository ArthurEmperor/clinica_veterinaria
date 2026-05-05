const pool = require('../../db');

const buscarTodos = async () => {
  const result = await pool.query('SELECT * FROM consultas ORDER BY id');
  return result.rows;
};

const buscarPorId = async (id) => {
  const result = await pool.query('SELECT * FROM consultas WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (consulta) => {
  const { animal_id, data_consulta, motivo, diagnostico, veterinario } = consulta;
  const result = await pool.query(
    'INSERT INTO consultas (animal_id, data_consulta, motivo, diagnostico, veterinario) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [animal_id, data_consulta, motivo, diagnostico, veterinario]
  );
  return result.rows[0];
};

const update = async (id, consulta) => {
  const { animal_id, data_consulta, motivo, diagnostico, veterinario } = consulta;
  const result = await pool.query(
    'UPDATE consultas SET animal_id = $1, data_consulta = $2, motivo = $3, diagnostico = $4, veterinario = $5 WHERE id = $6 RETURNING *',
    [animal_id, data_consulta, motivo, diagnostico, veterinario, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  await pool.query('DELETE FROM consultas WHERE id = $1', [id]);
};

const buscarPorAnimalId = async (animalId) => {
  const result = await pool.query(
    `SELECT c.*
     FROM consultas c
     JOIN animais a ON c.animal_id = a.id
     WHERE a.id = $1
     ORDER BY c.id`,
    [animalId]
  );
  return result.rows;
};

const findBytutoresId = async (tutorId) => {
  const result = await pool.query(
    `SELECT c.* 
     FROM consultas c
     JOIN animais a ON c.animal_id = a.id
     WHERE a.tutor_id = $1
     ORDER BY c.id`,
    [tutorId]
  );
  return result.rows;
};

module.exports = { buscarTodos, buscarPorId, create, update, remove, buscarPorAnimalId, findBytutoresId };
