require('dotenv').config();
const express = require('express');
const indexRoutes = require('./src/routes/index.route');

const app = express();
const PORT = process.env.PORT || 5433;


app.use(express.json());


app.use('/', indexRoutes);


app.use((req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada' });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Banco: ${process.env.DB_NAME} em ${process.env.DB_HOST}:${process.env.DB_PORT}`);
});