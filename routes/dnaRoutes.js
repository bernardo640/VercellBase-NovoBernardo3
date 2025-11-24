import express from 'express';
import multer from 'multer';
import DnaController from '../controllers/DnaController.js';

const router = express.Router();

// Configuração do Multer (salva imagens na memória)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Rotas do DNA
router.get('/dna/add', DnaController.openAdd);
router.post('/dna/add', upload.single('imagemFossil'), DnaController.add);

router.get('/dna/lst', DnaController.list);
router.post('/dna/lst', DnaController.list);

router.get('/dna/edt/:id', DnaController.openEdit);
router.post('/dna/edt/:id', upload.single('imagemFossil'), DnaController.edit);

router.get('/dna/del/:id', DnaController.delete);

export default router;
