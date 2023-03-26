const redis = require('redis');
const express = require("express");
const morgan = require("morgan"); 
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes");
const ejs = require('ejs');
require('dotenv').config();

const port = process.env.PORT || 9000;

const client = redis.createClient({
  password: process.env.REDIS_PW,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 14071,
    }
});

const app = express();

(async () => {
  await client.connect();
  client.on('error', err => console.log('Redis Client Error', err));
  client.on('ready', () => console.log('Redis Client Connected'));
})();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(morgan("dev"));
app.use(cors());
app.set('view engine', 'ejs');


const users = require("./routes/index");
const main = require("./routes/main");
const sellers = require("./routes/seller");


app.use("/", main);
app.use("/accounts", users);
app.use("/seller", sellers);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
