const express = require("express");
const morgan = require("morgan"); //Morgan is used for logging request details
const bodyParser = require("body-parser"); //body-parser to parse the JSON Data
const mongoose = require("mongoose");
const cors = require("cors"); //Package to connect middle-ware or cross-platform applications
const router = require("./routes");
const ejs = require('ejs');
require('dotenv').config();


const port = process.env.PORT || 9000;

const app = express();




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
