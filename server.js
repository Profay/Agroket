const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 9000;

app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
})
.catch((err) => {
  console.log(err);
});
app.use('/', router);

