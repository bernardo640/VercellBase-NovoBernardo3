import mongoose from 'mongoose';

const CientistaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  especialidade: { type: String, required: true },
  tempoExperiencia: { type: Number, required: true },
  nivelAcesso: { type: Number, required: true }, // ✅ campo mantido e usado
  foto: { type: Buffer, required: false }
});

export default mongoose.model('Cientista', CientistaSchema);
