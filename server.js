const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const databaseCon = require("./config/database");

const app = express();

app.get("/", (req, res) => {
  res.send("This Route is working");
});

app.use(cors());

dotenv.config();

databaseCon();
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
