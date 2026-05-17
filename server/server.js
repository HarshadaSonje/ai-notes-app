const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middleware (always first)
app.use(cors());
app.use(express.json());

// ✅ Routes
const authRoutes = require("./routes/authRoutes");   // 🔥 ADD THIS
const noteRoutes = require("./routes/noteRoutes");

app.use("/auth", authRoutes);   // 🔥 ADD THIS
app.use("/notes", noteRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// ✅ DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Start server
app.listen(5000, () => console.log("Server running on port 5000"));