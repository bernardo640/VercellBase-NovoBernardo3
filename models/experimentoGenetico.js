import mongoose from 'mongoose';

const ExperimentoGeneticoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  dataInicio: { type: Date, required: true },
  imagem: { type: Buffer, required: false } // opcional
});

export default mongoose.model('ExperimentoGenetico', ExperimentoGeneticoSchema);
