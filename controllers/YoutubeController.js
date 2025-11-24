import Youtube from '../models/youtube.js';
import Canal from '../models/canal.js';

export default class YoutubeController {

  // 👉 Página de adicionar vídeo
  static async openAdd(req, res) {
    const canais = await Canal.find();
    res.render('youtube/add', { canais });
  }

  // 👉 Adicionar vídeo com miniatura
  static async add(req, res) {
    try {
      await Youtube.create({
        titulo: req.body.titulo,
        canal: req.body.canal,
        duracao: req.body.duracao,
        visualizacoes: req.body.visualizacoes,
        upload: req.body.upload,
        acoes: req.body.acoes,
        miniatura: req.file ? req.file.buffer : undefined
      });
      res.redirect('/youtube/lst');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao adicionar vídeo.');
    }
  }

  // 👉 Listagem dos vídeos
  static async list(req, res) {
    const filtro = req.body.filtro || '';
    const videos = await Youtube.find({
      titulo: { $regex: filtro, $options: 'i' }
    }).populate('canal');

    const resposta = videos.map(video => ({
      _id: video._id,
      titulo: video.titulo,
      canal: video.canal,
      duracao: video.duracao,
      visualizacoes: video.visualizacoes,
      upload: video.upload,
      acoes: video.acoes,
      miniatura: video.miniatura && Buffer.isBuffer(video.miniatura)
        ? `data:image/png;base64,${video.miniatura.toString('base64')}`
        : null
    }));

    res.render('youtube/lst', { videos: resposta });
  }

  // 👉 Página de edição
  static async openEdit(req, res) {
    try {
      const youtube = await Youtube.findById(req.params.id).populate('canal');
      const canais = await Canal.find();
      res.render('youtube/edt', { youtube, canais });
    } catch (err) {
      res.status(404).send('Vídeo não encontrado.');
    }
  }

  // 👉 Atualizar vídeo
  static async edit(req, res) {
    try {
      const updateData = {
        titulo: req.body.titulo,
        canal: req.body.canal,
        duracao: req.body.duracao,
        visualizacoes: req.body.visualizacoes,
        upload: req.body.upload,
        acoes: req.body.acoes
      };

      if (req.file) {
        updateData.miniatura = req.file.buffer;
      }

      await Youtube.findByIdAndUpdate(req.params.id, updateData);
      res.redirect('/youtube/lst');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao atualizar vídeo.');
    }
  }

  // 👉 Excluir vídeo
  static async delete(req, res) {
    try {
      await Youtube.findByIdAndDelete(req.params.id);
      res.redirect('/youtube/lst');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao excluir vídeo.');
    }
  }
}
