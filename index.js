// install express with `npm install express`
const express = require('express');
const bcrypt = require('bcrypt');
const { Base } = require('deta');
const userBase = Base('users');
const app = express();
const path = require('path');

app.use(express.static('build'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  '/signup',
  async (req, res, next) => {
    try {
      const email = req.body.email;
      const user = await userBase.get(email);

      if (user) {
        res.redirect('/signup?error=100');
      } else {
        next();
      }
    } catch (error) {
      res.send(error);
    }
  },
  async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
      var hash = bcrypt.hashSync(password, 10);
      await userBase.put({ name: name, password: hash }, email);
      res.redirect('/');
    } catch (error) {
      res.send(error);
    }
  }
);

//ミドルウエアでstaticパスを追加（ただ、これだけだと直アクセスや無いpathだと動かない）
app.use(express.static(path.join(__dirname, '.', 'build')));

//これを追加（全てをindex.htmlにリダイレクト。いわゆるrewrite設定）
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '.', 'build', 'index.html'));
});

// export 'app'
module.exports = app;
