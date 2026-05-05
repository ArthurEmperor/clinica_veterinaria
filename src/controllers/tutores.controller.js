const tutoresService = require('../services/tutores.service');
const consultasService = require('../services/consultas.service');   

const getAll = async (req, res) => {
    try {
        const tutoress = await tutoresService.findAll();
        res.status(200).json(tutoress);
    } catch (error) {
        console.error('ERRO DETALHADO NO CONTROLLER:', error);
        console.error('MENSAGEM DO ERRO:', error.message);
        console.error('STACK:', error.stack);
        res.status(500).json({ erro: 'Erro ao buscar tutoress' });
    }
};
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const tutores = await tutoresService.findById(id);
        if (!tutores) {
            return res.status(404).json({ erro: 'tutores não encontrado' });
        }
        res.status(200).json(tutores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar tutores' });
    }
};

const create = async (req, res) => {
    try {
        const { nome, telefone, email } = req.body;
        if (!nome) {
            return res.status(400).json({ erro: 'Nome é obrigatório' });
        }
        const novotutores = await tutoresService.create({ nome, telefone, email });
        res.status(201).json(novotutores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao criar tutores' });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, telefone, email } = req.body;
        if (!nome) {
            return res.status(400).json({ erro: 'Nome é obrigatório' });
        }
        const tutoresAtualizado = await tutoresService.update(id, { nome, telefone, email });
        if (!tutoresAtualizado) {
            return res.status(404).json({ erro: 'tutores não encontrado' });
        }
        res.status(200).json(tutoresAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao atualizar tutores' });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const tutores = await tutoresService.findById(id);
        if (!tutores) {
            return res.status(404).json({ erro: 'tutores não encontrado' });
        }
        await tutoresService.remove(id);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao remover tutores' });
    }
};

const getPedidosBytutores = async (req, res) => {
    try {
        const { id } = req.params;
        const tutores = await tutoresService.findById(id);
        if (!tutores) {
            return res.status(404).json({ erro: 'tutores não encontrado' });
        }
        const pedidos = await consultasService.findBytutoresId(id);
        res.status(200).json(pedidos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar pedidos do tutores' });
    }
};

module.exports = { getAll, getById, create, update, remove, getPedidosBytutores };