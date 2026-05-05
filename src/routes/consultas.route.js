const express = require('express');
const router = express.Router();
const consultasController = require('../controllers/consultas.controller');



router.get('/', consultasController.getAll);
router.get('/:id', consultasController.getById);
router.post('/', consultasController.create);
router.put('/:id', consultasController.update);
router.delete('/:id', consultasController.remove);

module.exports = router;
