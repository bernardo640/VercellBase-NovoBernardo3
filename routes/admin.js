import express from 'express';
import basicAuth from '../middleware/basicAuth.js';
const router = express.Router();

// Aplica autenticação básica para proteger todas as rotas deste router
router.use(basicAuth);

router.get('/admin', (req, res) => {
  res.render('admin/index');
});

export default router;
