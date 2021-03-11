const express = require("express");
const app = express();
const mongoose = require("mongoose");
const homeRouter = require("./routes/homeRouter");
const userRouter = require("./routes/userRouter");
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


  app.use(homeRouter);
  app.use(userRouter);