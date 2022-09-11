// install express with `npm install express` 
const express = require('express');
const app = express();

app.use(express.static('build'));

app.get('/', (req, res) => {
  res.send('index.html')
});

// export 'app'
module.exports = app;
