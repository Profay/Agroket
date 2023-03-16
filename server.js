const express = require("express");
const morgan = require("morgan"); //Morgan is used for logging request details
const bodyParser = require("body-parser"); //body-parser to parse the JSON Data
const mongoose = require("mongoose");
const cors = require("cors"); //Package to connect middle-ware or cross-platform applications
const router = require("./routes");
require('dotenv').config();


const port = process.env.PORT || 9000;

const app = express();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(morgan("dev"));
app.use(cors());

//const userRoutes = require("./routes/account");
//const mainRoutes = require("./routes/main");
//const sellerRoutes = require("./routes/seller");
//const productSearchRoutes = require("./routes/product-search");

//express application using Routes from this application
app.use("/", router);
//app.use("/api/accounts", userRoutes);
//app.use("/api/seller", sellerRoutes);
//app.use("/api/search", productSearchRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
})
.catch((err) => {
  console.log(err);
});
