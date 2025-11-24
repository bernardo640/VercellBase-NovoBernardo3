import mongoose from 'mongoose';

const DinossauroSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  especie: { type: String, required: true },
  idade: { type: Number, required: true },
  nivelAgressividade: { type: Number, required: true },
  imagem: { type: Buffer, required: false } // imagem opcional do dinossauro
});

export default mongoose.model('Dinossauro', DinossauroSchema);
