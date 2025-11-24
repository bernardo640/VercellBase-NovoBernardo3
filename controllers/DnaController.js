import Dna from '../models/dna.js';

export default class DnaController {
  
  // 👉 Página de adicionar DNA
  static async openAdd(req, res) {
    res.render('dna/add');
  }

  // 👉 Adicionar DNA com imagem do fóssil
  static async add(req, res) {
    try {
      await Dna.create({
        sequenciaGenetica: req.body.sequenciaGenetica,
        pureza: req.body.pureza,
        origemFossil: req.body.origemFossil,
        imagemFossil: req.file ? req.file.buffer : undefined
      });
      res.redirect('/dna/lst');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao adicionar DNA.');
    }
  }

  // 👉 Listar DNAs com filtro
  static async list(req, res) {
    const filtro = req.body.filtro || '';
    const dnas = await Dna.find({
      sequenciaGenetica: { $regex: filtro, $options: 'i' }
    });

    const resposta = dnas.map(dna => ({
      _id: dna._id,
      sequenciaGenetica: dna.sequenciaGenetica,
      pureza: dna.pureza,
      origemFossil: dna.origemFossil,
      imagemFossil: dna.imagemFossil && Buffer.isBuffer(dna.imagemFossil)
        ? `data:image/png;base64,${dna.imagemFossil.toString('base64')}`
        : null
    }));

    res.render('dna/lst', { dnas: resposta });
  }

  // 👉 Página de edição
  static async openEdit(req, res) {
    try {
      const dna = await Dna.findById(req.params.id);
      res.render('dna/edt', { dna });
    } catch (err) {
      res.status(404).send('DNA não encontrado.');
    }
  }

  // 👉 Editar DNA
  static async edit(req, res) {
    try {
      const updateData = {
        sequenciaGenetica: req.body.sequenciaGenetica,
        pureza: req.body.pureza,
        origemFossil: req.body.origemFossil
      };

      if (req.file) {
        updateData.imagemFossil = req.file.buffer;
      }

      await Dna.findByIdAndUpdate(req.params.id, updateData);
      res.redirect('/dna/lst');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao atualizar DNA.');
    }
  }

  // 👉 Excluir DNA
  static async delete(req, res) {
    try {
      await Dna.findByIdAndDelete(req.params.id);
      res.redirect('/dna/lst');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao excluir DNA.');
    }
  }
}
