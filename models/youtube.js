import mongoose from 'mongoose';

const YoutubeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  canal: { type: mongoose.Schema.Types.ObjectId, ref: 'Canal', required: true },
  duracao: { type: Number, required: true },
  visualizacoes: { type: Number, required: true },
  upload: { type: Date, required: true },
  acoes: { type: String, required: true },
  miniatura: { type: Buffer, required: false }
});

export default mongoose.model('Youtube', YoutubeSchema);
