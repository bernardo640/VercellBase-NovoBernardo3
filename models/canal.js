import mongoose from 'mongoose';
import conexao from '../config/conexao.js';

const canalSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    inscritos: { type: Number, required: true },
    imagem: { type: Buffer, required: false }
});

export default conexao.model('Canal', canalSchema);
