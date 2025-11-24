import express from 'express';
import multer from 'multer';
import VendaController from '../controllers/VendaController.js';

const router = express.Router();
const upload = multer();
const vendaCtrl = new VendaController();

// Lista pública/admin de vendas
router.get('/vendas', vendaCtrl.index);

// Formulário para adicionar (pode ser acessado por admin)
router.get('/vendas/add', vendaCtrl.createForm);

// Cria nova venda (envio de imagem opcional)
router.post('/vendas/add', upload.single('imagem'), vendaCtrl.create);

export default router;
