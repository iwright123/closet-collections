const path = require('path');
const express = require('express');
const { db } = require('./db/db.js');

const port = 3000;

const dist = path.resolve(__dirname, '..', 'client', 'dist');
const app = express();
app.use(express.static(dist));


app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

