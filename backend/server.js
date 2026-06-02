const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

console.log("Mongo URI Loaded:", process.env.MONGO_URI ? "YES" : "NO");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Server Running Successfully");
});

app.listen(5000, () => {
  console.log("🚀 Server Started On Port 5000");
});