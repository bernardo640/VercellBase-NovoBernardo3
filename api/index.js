// index.js
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
// garante conexão com o MongoDB (arquivo faz o connect)
import '../config/conexao.js';

// 🔗 Importação das rotas antigas
import routes from '../routes/route.js';
import alunoRoutes from '../routes/AlunoRoutes.js';
import cursoRoutes from '../routes/CursoRoutes.js';
import youtubeRoutes from '../routes/YoutubeRoutes.js';
import canalRoutes from '../routes/CanalRoutes.js';

// 🧬 Importação das rotas novas (projeto genético)
import dnaRoutes from '../routes/dnaRoutes.js';
import dinossauroRoutes from '../routes/dinossauroRoutes.js';
import experimentoGeneticoRoutes from '../routes/experimentoGeneticoRoutes.js';
import cientistaRoutes from '../routes/cientista.js';
import adminRoutes from '../routes/admin.js';


//SITE
import SiteRoutes from '../routes/SiteRoutes.js';



// 🚀 Criação do app
const app = express();

// 🧩 Middleware para receber dados de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔐 Configuração de sessão
app.use(session({
  secret: process.env.SESSION_SECRET || 'sua-chave-secreta-aqui',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 } // 24 horas
}));

// ⚙️ Configuração do EJS
app.set('view engine', 'ejs');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('views', join(__dirname, '../views'));

// 📁 Servir arquivos estáticos (CSS, imagens, JS)
app.use(express.static(join(__dirname, '../public')));

// 🧩 Registro de todas as rotas
// Rotas antigas
app.use(alunoRoutes);
app.use(cursoRoutes);
app.use(youtubeRoutes);
app.use(canalRoutes);

// Rotas novas (projeto genético)
app.use(dnaRoutes);
app.use(dinossauroRoutes);
app.use(experimentoGeneticoRoutes);
app.use(cientistaRoutes);
app.use(adminRoutes);


//site
app.use(SiteRoutes)

// Rota principal (menu ou inicial)
app.use(routes);

// 🚀 Inicialização do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// 🌐 Exporta o handler compatível com Vercel
export default app;
