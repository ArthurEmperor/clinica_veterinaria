const animalService = require('../services/animais.service');
const consultasService = require('../services/consultas.service');

const getAll = async (req, res) => {
  try {
    const animais = await animalService.buscarTodos();
    return res.status(200).json(animais);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao buscar animais' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await animalService.buscarPorId(id);
    if (!animal) {
      return res.status(404).json({ erro: 'Animal não encontrado' });
    }
    return res.status(200).json(animal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao buscar animal' });
  }
};

const create = async (req, res) => {
  try {
    const { nome, especie, raca, data_nascimento, tutor_id } = req.body;
    if (!nome) {
      return res.status(400).json({ erro: 'Nome do animal é obrigatório' });
    }
    const novoAnimal = await animalService.create({ nome, especie, raca, data_nascimento, tutor_id });
    return res.status(201).json(novoAnimal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao cadastrar animal' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, especie, raca, data_nascimento, tutor_id } = req.body;
    if (!nome) {
      return res.status(400).json({ erro: 'Nome do animal é obrigatório' });
    }
    const animalAtualizado = await animalService.update(id, { nome, especie, raca, data_nascimento, tutor_id });
    if (!animalAtualizado) {
      return res.status(404).json({ erro: 'Animal não encontrado' });
    }
    return res.status(200).json(animalAtualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao atualizar animal' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await animalService.buscarPorId(id);
    if (!animal) {
      return res.status(404).json({ erro: 'Animal não encontrado' });
    }
    await animalService.remove(id);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao remover animal' });
  }
};

const getConsultasPorAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await animalService.buscarPorId(id);
    if (!animal) {
      return res.status(404).json({ erro: 'Animal não encontrado' });
    }
    const consultas = await consultasService.buscarPorAnimalId(id);
    return res.status(200).json(consultas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao buscar consultas do animal' });
  }
};

module.exports = { getAll, getById, create, update, remove, getConsultasPorAnimal };
