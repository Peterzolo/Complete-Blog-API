const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const databaseCon = require("./config/database");
const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");

const app = express();

app.get("/", (req, res) => {
  res.send("This Route is working");
});

app.use(cors());
app.use(express.json());
dotenv.config();
app.use(morgan());

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

databaseCon();
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
