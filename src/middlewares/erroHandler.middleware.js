const errorHandler = (err, req, res, next) => {
  console.error(`[ERRO] ${req.method} ${req.url}:`, err.message);

  const status = err.status || 500;

  res.status(status).json({
    erro: err.message || 'Erro interno no servidor da clínica veterinária',
    caminho: req.url,
  });
};

module.exports = errorHandler;