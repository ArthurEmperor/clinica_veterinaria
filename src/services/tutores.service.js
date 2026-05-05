const pool = require('');


const findAll = async () => {
    const result = await pool.query('SELECT * FROM clientes ORDER BY id');
    return result.rows;
};


const findById = async (id) => {
    const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
    return result.rows[0];
};


const create = async (cliente) => {
    const { nome, telefone, email } = cliente;
    const result = await pool.query(
        'INSERT INTO clientes (nome, telefone, email) VALUES ($1, $2, $3) RETURNING *',
        [nome, telefone, email]
    );
    return result.rows[0];
};


const update = async (id, cliente) => {
    const { nome, telefone, email } = cliente;
    const result = await pool.query(
        'UPDATE clientes SET nome = $1, telefone = $2, email = $3 WHERE id = $4 RETURNING *',
        [nome, telefone, email, id]
    );
    return result.rows[0];
};


const remove = async (id) => {
    await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
};

module.exports = { findAll, findById, create, update, remove };