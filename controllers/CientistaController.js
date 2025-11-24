import Cientista from '../models/cientista.js';

export default class CientistaController {

  // 👉 Página de adicionar cientista
  static async openAdd(req, res) {
    res.render('cientista/add');
  }

  // 👉 Adicionar novo cientista
  static async add(req, res) {
    try {
      await Cientista.create({
        nome: req.body.nome,
        especialidade: req.body.especialidade,
        tempoExperiencia: req.body.tempoExperiencia,
        nivelAcesso: req.body.nivelAcesso, // ✅ campo adicionado
        foto: req.file ? req.file.buffer : undefined
      });
      res.redirect('/cientista/lst');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao adicionar cientista.');
    }
  }

  // 👉 Listar cientistas
  static async list(req, res) {
    const filtro = req.body.filtro || '';
    const cientistas = await Cientista.find({
      nome: { $regex: filtro, $options: 'i' }
    });

    const resposta = cientistas.map(cientista => ({
      _id: cientista._id,
      nome: cientista.nome,
      especialidade: cientista.especialidade,
      tempoExperiencia: cientista.tempoExperiencia,
      nivelAcesso: cientista.nivelAcesso, // ✅ mostrar também
      foto: cientista.foto && Buffer.isBuffer(cientista.foto)
        ? `data:image/png;base64,${cientista.foto.toString('base64')}`
        : null
    }));

    res.render('cientista/lst', { cientistas: resposta });
  }

  // 👉 Página de edição
  static async openEdit(req, res) {
    try {
      const cientista = await Cientista.findById(req.params.id);
      res.render('cientista/edt', { cientista });
    } catch (err) {
      res.status(404).send('Cientista não encontrado.');
    }
  }

  // 👉 Atualizar cientista
  static async edit(req, res) {
    try {
      const updateData = {
        nome: req.body.nome,
        especialidade: req.body.especialidade,
        tempoExperiencia: req.body.tempoExperiencia,
        nivelAcesso: req.body.nivelAcesso // ✅ manter também na edição
      };

      if (req.file) {
        updateData.foto = req.file.buffer;
      }

      await Cientista.findByIdAndUpdate(req.params.id, updateData);
      res.redirect('/cientista/lst');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao atualizar cientista.');
    }
  }

  // 👉 Excluir cientista
  static async delete(req, res) {
    try {
      await Cientista.findByIdAndDelete(req.params.id);
      res.redirect('/cientista/lst');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao excluir cientista.');
    }
  }
}
