import express from 'express';
import multer from 'multer';
import CanalController from '../controllers/CanalController.js';

const router = express.Router();
const controle = new CanalController();

// Configuração do Multer (armazenamento em memória)
const storage = multer.memoryStorage();
const upload = multer({ storage });

const caminhoBase = 'canal/';

router.get('/' + caminhoBase + 'add', controle.openAdd);
router.post('/' + caminhoBase + 'add', upload.single('imagem'), controle.add);

router.get('/' + caminhoBase + 'lst', controle.list);
router.post('/' + caminhoBase + 'lst', controle.find);

router.get('/' + caminhoBase + 'del/:id', controle.del);
router.get('/' + caminhoBase + 'edt/:id', controle.openEdt);
router.post('/' + caminhoBase + 'edt/:id', upload.single('imagem'), controle.edt);

export default router;
