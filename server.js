const express = require('express');
const router = require('./router');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});