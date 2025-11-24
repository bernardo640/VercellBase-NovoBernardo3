import Venda from '../models/venda.js';

export default class VendaController {
  constructor() {
    this.index = async (req, res) => {
      try {
        const vendas = await Venda.find().sort({ _id: -1 }).limit(20);
        res.render('venda/lst', { vendas });
      } catch (err) {
        console.error(err);
        res.render('venda/lst', { vendas: [] });
      }
    };

    this.createForm = (req, res) => {
      res.render('venda/add');
    };

    this.create = async (req, res) => {
      try {
        const { nomeDino, preco, comprador, contato, descricao } = req.body;
        const venda = new Venda({
          nomeDino,
          preco: Number(preco) || 0,
          comprador,
          contato,
          descricao
        });
        if (req.file && req.file.buffer) venda.imagem = req.file.buffer;
        await venda.save();
        return res.redirect('/vendas');
      } catch (err) {
        console.error(err);
        return res.status(500).send('Erro ao salvar venda');
      }
    };
  }
}
