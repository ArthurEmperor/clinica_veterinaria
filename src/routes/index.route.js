const express = require('express');
const router = express.Router();
const tutoresRouter = require('./tutores.route');
const animaisRouter = require('./animais.route');
const consultasRouter = require('./consultas.route');

router.use('/tutores', tutoresRouter);
router.use('/animais', animaisRouter);
router.use('/consultas', consultasRouter);

module.exports = router;