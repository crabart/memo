// install express with `npm install express`
const express = require('express');
const bcrypt = require('bcrypt');
const { Base } = require('deta');
const userBase = Base('users');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/signin', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userBase.get(email);
    if (user === null) {
      res.status(401).send(JSON.stringify({ code: '200' }));
    } else {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.status(400).send(JSON.stringify({ code: '999', message: err }));
        } else if (result) {
          res.send('signin success');
        } else {
          res.status(401).send(JSON.stringify({ code: '200' }));
        }
      });
    }
  } catch (error) {
    res.status(400).send(JSON.stringify({ code: '999', message: error }));
  }
});

app.post(
  '/signup',
  async (req, res, next) => {
    try {
      const email = req.body.email;
      const user = await userBase.get(email);

      if (user) {
        res.status(400).send(JSON.stringify({ code: '100' }));
      } else {
        next();
      }
    } catch (error) {
      res.status(400).send(JSON.stringify({ code: '999', message: error }));
    }
  },
  (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
      var hash = bcrypt.hashSync(password, 10);
      userBase.put({ name: name, password: hash }, email).then(() => {
        res.send('regidter');
      });
    } catch (error) {
      res.status(400).send(JSON.stringify({ code: '999', message: error }));
    }
  }
);

//ミドルウエアでstaticパスを追加（ただ、これだけだと直アクセスや無いpathだと動かない）
app.use(express.static(path.join(__dirname, '.', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'build', 'index.html'));
});

// export 'app'
module.exports = app;
