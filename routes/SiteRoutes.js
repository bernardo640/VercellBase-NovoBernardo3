import express from 'express';
const router = express.Router();
import controller from '../controllers/SiteController.js';
const controle = new controller();

router.get('/site', controle.home);

export default router;