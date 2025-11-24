import mongoose from 'mongoose';

const VendaSchema = new mongoose.Schema({
  nomeDino: { type: String, required: true },
  preco: { type: Number, required: true },
  comprador: { type: String },
  contato: { type: String },
  descricao: { type: String },
  imagem: { type: Buffer },
  dataVenda: { type: Date, default: Date.now }
});

export default mongoose.model('Venda', VendaSchema);
