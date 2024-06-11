const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/api/userRoute");
const PdfRoutes = require("./routes/api/pdfRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

require("./config/passport")(passport);

//UserRoutes
app.use("/api/users", userRoutes);

//PdfRoutes
app.use("/api/pdfs", PdfRoutes);
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
