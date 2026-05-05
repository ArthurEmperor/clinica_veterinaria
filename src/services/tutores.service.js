const pool = require('../../db');
const buscarTodos = async () => {
    const result = await pool.query('SELECT * FROM tutores ORDER BY id');
    return result.rows;
};

const buscarPorId = async (id) => {
    const result = await pool.query('SELECT * FROM tutores WHERE id = $1', [id]);
    return result.rows[0];
};

const create = async (tutor) => {
    const { nome, telefone, email } = tutor;
    const result = await pool.query(
        'INSERT INTO tutores (nome, telefone, email) VALUES ($1, $2, $3) RETURNING *',
        [nome, telefone, email]
    );
    return result.rows[0];
};

const update = async (id, tutor) => {
    const { nome, telefone, email } = tutor;
    const result = await pool.query(
        'UPDATE tutores SET nome = $1, telefone = $2, email = $3 WHERE id = $4 RETURNING *',
        [nome, telefone, email, id]
    );
    return result.rows[0];
};

const remove = async (id) => {
    await pool.query('DELETE FROM tutores WHERE id = $1', [id]);
};

module.exports = { buscarTodos, buscarPorId, create, update, remove };