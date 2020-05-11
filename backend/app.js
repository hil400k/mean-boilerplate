const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();
// TiMEkZFxewDTfde4

mongoose.connect(`mongodb+srv://dmytro:${process.env.MONGO_ATLAS_PW}@cluster0-2p8lv.mongodb.net/node-angular?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.info("Connected to DB");
  })
  .catch(() => {
    console.info("Connection failed");
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "ui")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});


app.use("/api", postRoutes);
app.use("/user", userRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "ui", "index.html"))
})

module.exports = app;
