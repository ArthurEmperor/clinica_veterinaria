const dotenv = require('dotenv').config();
const express = require('express');
const indexRoutes = require('./src/routes/index.route');
const { logger, errorHandler } = require('./src/middlewares/main.middleware');

const app = express();


app.use(express.json());
app.use(logger);

app.use(indexRoutes);
app.use(errorHandler);

app.use((req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada' });
});

const PORT = 3000;
const server = app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Banco: ${process.env.DB_NAME} em ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    console.log('Use Ctrl+C para encerrar o servidor.');
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Erro: a porta ${PORT} já está em uso. Feche o servidor existente ou use outra porta.`);
    } else {
        console.error('Erro no servidor:', err);
    }
    process.exit(1);
});
