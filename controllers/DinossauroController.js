import Dinossauro from '../models/dinossauro.js';

export default class DinossauroController {

  // 👉 Página de cadastro
  static async openAdd(req, res) {
    res.render('dinossauro/add');
  }

  // 👉 Adicionar dinossauro
  static async add(req, res) {
    try {
      await Dinossauro.create({
        nome: req.body.nome,
        especie: req.body.especie,
        idade: req.body.idade,
        nivelAgressividade: req.body.nivelAgressividade,
        imagem: req.file ? req.file.buffer : undefined
      });
      res.redirect('/dinossauro/lst');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao adicionar dinossauro.');
    }
  }

  // 👉 Listar dinossauros
  static async list(req, res) {
    const filtro = req.body.filtro || '';
    const dinos = await Dinossauro.find({
      nome: { $regex: filtro, $options: 'i' }
    });

    const resposta = dinos.map(dino => ({
      _id: dino._id,
      nome: dino.nome,
      especie: dino.especie,
      idade: dino.idade,
      nivelAgressividade: dino.nivelAgressividade,
      imagem: dino.imagem && Buffer.isBuffer(dino.imagem)
        ? `data:image/png;base64,${dino.imagem.toString('base64')}`
        : null
    }));

    res.render('dinossauro/lst', { dinos: resposta });
  }

  // 👉 Página de edição
  static async openEdit(req, res) {
    try {
      const dino = await Dinossauro.findById(req.params.id);
      res.render('dinossauro/edt', { dino });
    } catch (err) {
      res.status(404).send('Dinossauro não encontrado.');
    }
  }

  // 👉 Atualizar
  static async edit(req, res) {
    try {
      const updateData = {
        nome: req.body.nome,
        especie: req.body.especie,
        idade: req.body.idade,
        nivelAgressividade: req.body.nivelAgressividade
      };

      if (req.file) {
        updateData.imagem = req.file.buffer;
      }

      await Dinossauro.findByIdAndUpdate(req.params.id, updateData);
      res.redirect('/dinossauro/lst');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao atualizar dinossauro.');
    }
  }

  // 👉 Excluir
  static async delete(req, res) {
    try {
      await Dinossauro.findByIdAndDelete(req.params.id);
      res.redirect('/dinossauro/lst');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao excluir dinossauro.');
    }
  }
}
