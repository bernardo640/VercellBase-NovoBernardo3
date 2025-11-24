// middleware/basicAuth.js
export default function basicAuth(req, res, next) {
  const auth = req.headers.authorization;
  const user = process.env.ADMIN_USER || 'admin';
  const pass = process.env.ADMIN_PASS || 'admin';

  if (!auth || !auth.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Autenticação necessária.');
  }

  const base64Credentials = auth.split(' ')[1] || '';
  let credentials = '';
  try {
    credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
  } catch (err) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Autenticação inválida.');
  }

  const [reqUser, reqPass] = credentials.split(':');
  if (reqUser === user && reqPass === pass) {
    return next();
  }

  res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
  return res.status(401).send('Usuário ou senha incorretos.');
}
