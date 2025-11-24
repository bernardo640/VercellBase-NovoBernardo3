import express from 'express';
const router = express.Router();
import controller from '../controllers/controller.js';
const controle = new controller();

// redireciona a raiz do site para a página pública do projeto
router.get('/', (req, res) => {
	res.redirect('/site');
});
router.get('/teste', controle.teste);
router.post('/formulario', controle.formulario);

export default router;
