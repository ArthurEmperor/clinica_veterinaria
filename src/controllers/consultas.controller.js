const consultaService = require('../services/consultas.service');

const getAll = async (req, res) => {
  try {
    const consultas = await consultaService.buscarTodos();
    return res.status(200).json(consultas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao buscar consultas' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const consulta = await consultaService.buscarPorId(id);
    if (!consulta) {
      return res.status(404).json({ erro: 'Consulta não encontrada' });
    }
    return res.status(200).json(consulta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao buscar consulta' });
  }
};

const create = async (req, res) => {
  try {
    const { animal_id, data_consulta, motivo, diagnostico, veterinario } = req.body;
    if (!animal_id || !data_consulta) {
      return res.status(400).json({ erro: 'animal_id e data_consulta são obrigatórios' });
    }
    const novaConsulta = await consultaService.create({ animal_id, data_consulta, motivo, diagnostico, veterinario });
    return res.status(201).json(novaConsulta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao registrar consulta' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { animal_id, data_consulta, motivo, diagnostico, veterinario } = req.body;
    if (!animal_id || !data_consulta) {
      return res.status(400).json({ erro: 'animal_id e data_consulta são obrigatórios' });
    }
    const consultaAtualizada = await consultaService.update(id, { animal_id, data_consulta, motivo, diagnostico, veterinario });
    if (!consultaAtualizada) {
      return res.status(404).json({ erro: 'Consulta não encontrada' });
    }
    return res.status(200).json(consultaAtualizada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao atualizar consulta' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const consulta = await consultaService.buscarPorId(id);
    if (!consulta) {
      return res.status(404).json({ erro: 'Consulta não encontrada' });
    }
    await consultaService.remove(id);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao remover consulta' });
  }
};

module.exports = { getAll, getById, create, update, remove };
