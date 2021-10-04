const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");

const databaseCon = require("./config/database");
const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");
const catRouter = require("./routes/categoriesRoute");
const { urlencoded } = require("body-parser");

const app = express();

app.get("/", (req, res) => {
  res.send("This Route is working");
});

app.use(cors());
app.use(express.json());
dotenv.config();
app.use(morgan());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", catRouter);

databaseCon();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const uploadImage = multer({ storage: storage });
app.post("/api/upload", uploadImage.single("file"), (req, res) => {
  res.status(200).send("Image successfully added");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
