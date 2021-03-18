const express = require("express");
const app = express();
const mongoose = require("mongoose");
const homeRouter = require("./routes/homeRouter");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter")
const productRouter = require("./routes/productRouter");
const cookieParser = require("cookie-parser")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useCreateIndex: true,
  };


  mongoose.connect(process.env.DATABASE_LOGIN, options, (err) => {
    if (err) return;
    app.listen(8000, () => {
      console.log("Portnumber:8000");
    });
  });
  app.use(express.static(__dirname + "/public"))
  app.use(cookieParser());
  app.use(homeRouter);
  app.use(userRouter);
  app.use(productRouter);
  app.use(adminRouter);