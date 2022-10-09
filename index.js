// install express with `npm install express`
const express = require('express');
const bcrypt = require('bcrypt');
const { Base } = require('deta');
const userBase = Base('users');
const tempUser = Base('tempUsers');
const crypto = require('crypto');
require('dotenv').config({ path: '.env.mailer' });
const nodemailer = require('nodemailer');

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

app.get('/signup/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const tempData = await tempUser.get(id);
    if (tempData === null) {
      res.status(400).send('Bad request');
    } else {
      userBase
        .put(
          { name: tempData.name, password: tempData.password },
          tempData.email
        )
        .then(() => {
          tempUser.delete(id);

          res.redirect('/');
        });
    }
  } catch (error) {}
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
    const uuid = crypto.randomUUID();
    try {
      var hash = bcrypt.hashSync(password, 10);
      tempUser
        .put({ name: name, email: email, password: hash }, uuid, {
          expireIn: 3600,
        })
        .then(() => {
          const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
          });

          const baseURL = process.env.REACT_APP_URL
            ? process.env.REACT_APP_URL + '/signup/'
            : 'https://k8cr7e.deta.dev:3000/signup/';
          const url = baseURL + uuid;

          const data = {
            from: 'noreply@crabservices.com',
            to: email,
            subject: '仮登録メール',
            html: `<div>登録ありがとうございます。<br>現在仮登録中ですので以下のリンクにアクセスして本登録を完了してください。</div>
                    <div><a href=${url}>${url}<a></div>
                    <div>もし本メールに心当たりがない場合、破棄をお願いいたします。</div>`,
          };

          transporter.sendMail(data, (error, info) => {
            console.log(error);
            console.log(info);
            res.send('register');
          });
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

app.listen(3000, () => {
  console.log('listen start');
});
