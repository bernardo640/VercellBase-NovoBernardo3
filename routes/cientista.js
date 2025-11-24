import express from 'express';
import multer from 'multer';
import CientistaController from '../controllers/CientistaController.js';

const router = express.Router();

// Configuração do Multer (salva as imagens na memória)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Rotas
router.get('/cientista/add', CientistaController.openAdd);
router.post('/cientista/add', upload.single('foto'), CientistaController.add);

router.get('/cientista/lst', CientistaController.list);
router.post('/cientista/lst', CientistaController.list);

router.get('/cientista/edt/:id', CientistaController.openEdit);
router.post('/cientista/edt/:id', upload.single('foto'), CientistaController.edit);

router.get('/cientista/del/:id', CientistaController.delete);

export default router;
