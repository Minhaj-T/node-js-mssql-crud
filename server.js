const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const db = require("./models");
const PORT  = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/todoRoute'));


    app.listen(PORT, () => {
      console.log(`listening on: http://localhost:${PORT}`);
    });
  