const express = require('express');
const router = express.Router();
const animaisController = require('../controllers/animais.controller');

router.get('/', animaisController.getAll);
router.get('/:id', animaisController.getById);
router.get('/:id/consultas', animaisController.getConsultasPorAnimal);
router.post('/', animaisController.create);
router.put('/:id', animaisController.update);
router.delete('/:id', animaisController.remove);

module.exports = router;
