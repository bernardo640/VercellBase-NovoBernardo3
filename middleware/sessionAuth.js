// middleware/sessionAuth.js
export default function sessionAuth(req, res, next) {
  if (req.session && req.session.authenticated) {
    return next();
  }
  // redirect to login form if not authenticated
  return res.redirect('/admin/login');
}
