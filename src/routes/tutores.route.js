const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutores.controller');
const autenticar = require('../middlewares/auth.middleware');

router.use(autenticar);

router.get('/', tutorController.getAll);
router.get('/:id', tutorController.getById);
router.get('/:id/pedidos', tutorController.getPedidosByTutor);
router.post('/', tutorController.create);
router.put('/:id', tutorController.update);
router.delete('/:id', tutorController.remove);

module.exports = router;