import express from 'express';
import sessionAuth from '../middleware/sessionAuth.js';
const router = express.Router();

// Rota de login (sem proteção)
router.get('/admin/login', (req, res) => {
  res.render('admin/login');
});

// Processar login
router.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPass = process.env.ADMIN_PASS || 'admin';

  if (username === adminUser && password === adminPass) {
    req.session.authenticated = true;
    return res.redirect('/admin');
  }

  return res.render('admin/login', { erro: 'Usuário ou senha incorretos!' });
});

// Rota de logout
router.get('/admin/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Erro ao fazer logout');
    }
    res.redirect('/');
  });
});

// Aplica autenticação para proteger a rota de admin
router.get('/admin', sessionAuth, (req, res) => {
  res.render('admin/index');
});

export default router;

