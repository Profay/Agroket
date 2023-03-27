const express = require("express");
const morgan = require("morgan"); 
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser')
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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



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
