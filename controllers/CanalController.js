import Canal from '../models/canal.js';

export default class CanalController {
  constructor(caminhoBase = 'canal/') {
    this.caminhoBase = caminhoBase;

    // Abre o formulário de cadastro
    this.openAdd = async (req, res) => {
      res.render(this.caminhoBase + "add");
    };

    // Cadastra um novo canal com imagem
    this.add = async (req, res) => {
      await Canal.create({
        nome: req.body.nome,
        inscritos: req.body.inscritos,
        imagem: req.file ? req.file.buffer : null
      });
      res.redirect('/' + this.caminhoBase + 'lst');
    };

    // Lista canais com imagem convertida
    this.list = async (req, res) => {
      const canais = await Canal.find({});
      const resposta = canais.map(canal => ({
        id: canal._id,
        nome: canal.nome,
        inscritos: canal.inscritos,
        imagem: canal.imagem && Buffer.isBuffer(canal.imagem)
          ? `data:image/png;base64,${canal.imagem.toString('base64')}`
          : null
      }));

      res.render(this.caminhoBase + 'lst', { canais: resposta });
    };

    // Pesquisa
    this.find = async (req, res) => {
      const filtro = req.body.filtro;
      const resultado = await Canal.find({
        nome: { $regex: filtro, $options: "i" }
      });
      const resposta = resultado.map(canal => ({
        id: canal._id,
        nome: canal.nome,
        inscritos: canal.inscritos,
        imagem: canal.imagem && Buffer.isBuffer(canal.imagem)
          ? `data:image/png;base64,${canal.imagem.toString('base64')}`
          : null
      }));

      res.render(this.caminhoBase + 'lst', { canais: resposta });
    };

    // Abre edição
    this.openEdt = async (req, res) => {
      const canal = await Canal.findById(req.params.id);
      res.render(this.caminhoBase + "edt", { canal });
    };

    // Edita canal
    this.edt = async (req, res) => {
      const dados = {
        nome: req.body.nome,
        inscritos: req.body.inscritos
      };
      if (req.file) dados.imagem = req.file.buffer;
      await Canal.findByIdAndUpdate(req.params.id, dados);
      res.redirect('/' + this.caminhoBase + 'lst');
    };

    // Exclui canal
    this.del = async (req, res) => {
      await Canal.findByIdAndDelete(req.params.id);
      res.redirect('/' + this.caminhoBase + 'lst');
    };
  }
}
