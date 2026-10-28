const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// .env se MONGO_URI le raha hai
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
})
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.log("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Server is Live!");
});

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send("Server is live!");
});

module.exports = app;