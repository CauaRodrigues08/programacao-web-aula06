const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Acesso em: ${req.method} ${req.url}`);
  next();
});

const routeMiddleware = (routeName) => (req, res) => {
  res.send(`<h1>${routeName}</h1>`);
};

app.get('/', routeMiddleware('/'));

app.get('/about', routeMiddleware('/about'));

app.get('/users', routeMiddleware('/users'));

app.get('/users/signin', (req, res) => {
  const userid = req.query.userid;
  if (userid) {
    res.redirect(`/users/${userid}`);
  } else {
    res.redirect('/users/signup');
  }
});

app.get('/users/signup', routeMiddleware('/users/signup'));
app.get('/users/:userid', (req, res) => {
  const userid = req.params.userid;
  res.send(`<h1>Bem-vindo, usuário ${userid}!</h1>`);
});

app.get('/data', routeMiddleware('/data'))

app.post('/data', routeMiddleware('/data'));

app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Página não encontrada</h1>
    <a href="/">Voltar para a página inicial</a>
  `);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});