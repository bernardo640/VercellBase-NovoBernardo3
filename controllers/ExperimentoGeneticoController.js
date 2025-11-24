import ExperimentoGenetico from '../models/experimentoGenetico.js';

export default class ExperimentoGeneticoController {

  // Página de cadastro
  static async openAdd(req, res) {
    res.render('experimentoGenetico/add');
  }

  // Adicionar experimento
  static async add(req, res) {
    try {
      await ExperimentoGenetico.create({
        nome: req.body.nome,
        descricao: req.body.descricao,
        dataInicio: req.body.dataInicio,
        imagem: req.file ? req.file.buffer : undefined
      });
      res.redirect('/experimentoGenetico/lst');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao adicionar experimento genético.');
    }
  }

  // Listar experimentos
  static async list(req, res) {
    const filtro = req.body.filtro || '';
    const experimentos = await ExperimentoGenetico.find({
      nome: { $regex: filtro, $options: 'i' }
    });

    const resposta = experimentos.map(exp => ({
      _id: exp._id,
      nome: exp.nome,
      descricao: exp.descricao,
      dataInicio: exp.dataInicio,
      imagem: exp.imagem && Buffer.isBuffer(exp.imagem)
        ? `data:image/png;base64,${exp.imagem.toString('base64')}`
        : null
    }));

    res.render('experimentoGenetico/lst', { experimentos: resposta });
  }

  // Página de edição
  static async openEdit(req, res) {
    try {
      const experimento = await ExperimentoGenetico.findById(req.params.id);
      res.render('experimentoGenetico/edt', { experimento });
    } catch (err) {
      res.status(404).send('Experimento não encontrado.');
    }
  }

  // Atualizar experimento
  static async edit(req, res) {
    try {
      const updateData = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        dataInicio: req.body.dataInicio
      };

      if (req.file) updateData.imagem = req.file.buffer;

      await ExperimentoGenetico.findByIdAndUpdate(req.params.id, updateData);
      res.redirect('/experimentoGenetico/lst');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao atualizar experimento.');
    }
  }

  // Excluir experimento
  static async delete(req, res) {
    try {
      await ExperimentoGenetico.findByIdAndDelete(req.params.id);
      res.redirect('/experimentoGenetico/lst');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao excluir experimento.');
    }
  }
}
