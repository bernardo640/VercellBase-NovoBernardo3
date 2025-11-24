import express from 'express';
import multer from 'multer';
import DinossauroController from '../controllers/DinossauroController.js';

const router = express.Router();

// Configuração do multer (para upload de imagem em memória)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Rotas principais
router.get('/dinossauro/add', DinossauroController.openAdd);
router.post('/dinossauro/add', upload.single('imagem'), DinossauroController.add);

router.get('/dinossauro/lst', DinossauroController.list);
router.post('/dinossauro/lst', DinossauroController.list);

router.get('/dinossauro/edt/:id', DinossauroController.openEdit);
router.post('/dinossauro/edt/:id', upload.single('imagem'), DinossauroController.edit);

router.get('/dinossauro/del/:id', DinossauroController.delete);

export default router;
