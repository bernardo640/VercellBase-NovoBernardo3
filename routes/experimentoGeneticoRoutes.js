import express from 'express';
import multer from 'multer';
import ExperimentoGeneticoController from '../controllers/ExperimentoGeneticoController.js';

const router = express.Router();

// Multer: upload de imagem na memória
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Rotas
router.get('/experimentoGenetico/add', ExperimentoGeneticoController.openAdd);
router.post('/experimentoGenetico/add', upload.single('imagem'), ExperimentoGeneticoController.add);

router.get('/experimentoGenetico/lst', ExperimentoGeneticoController.list);
router.post('/experimentoGenetico/lst', ExperimentoGeneticoController.list);

router.get('/experimentoGenetico/edt/:id', ExperimentoGeneticoController.openEdit);
router.post('/experimentoGenetico/edt/:id', upload.single('imagem'), ExperimentoGeneticoController.edit);

router.get('/experimentoGenetico/del/:id', ExperimentoGeneticoController.delete);

export default router;
