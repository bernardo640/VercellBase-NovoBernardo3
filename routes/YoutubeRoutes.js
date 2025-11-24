import express from 'express';
import multer from 'multer';
import YoutubeController from '../controllers/YoutubeController.js';

const router = express.Router();

// Configuração do Multer (salva imagens na memória)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Rotas
router.get('/youtube/add', YoutubeController.openAdd);
router.post('/youtube/add', upload.single('miniatura'), YoutubeController.add);

router.get('/youtube/lst', YoutubeController.list);
router.post('/youtube/lst', YoutubeController.list);

router.get('/youtube/edt/:id', YoutubeController.openEdit);
router.post('/youtube/edt/:id', upload.single('miniatura'), YoutubeController.edit);

router.get('/youtube/del/:id', YoutubeController.delete);

export default router;
