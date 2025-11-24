import mongoose from 'mongoose';

const DnaSchema = new mongoose.Schema({
  sequenciaGenetica: { type: String, required: true },
  pureza: { type: Number, required: true },
  origemFossil: { type: String, required: true },
  imagemFossil: { type: Buffer, required: false } // upload de imagem opcional
});

export default mongoose.model('Dna', DnaSchema);
