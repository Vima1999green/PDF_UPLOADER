const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connection Successfull");
  })
  .catch((error) => {
    console.error("MongoDB connection error :", err);
  });

//port assingment
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
