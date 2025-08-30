// ---------------------------
// backend/app.js
// ---------------------------

// 1️⃣ Load environment variables first
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 2️⃣ Debug: make sure dotenv is working
console.log("Current working directory:", process.cwd());
console.log("ENV file path:", require("path").resolve(".env"));
console.log("MONGO_URL:", process.env.MONGO_URL); // Must print full URI

// 3️⃣ Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// 4️⃣ Basic health-check route
app.get("/api/ping", (req, res) => res.json({ message: "pong" }));

// 5️⃣ Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

connectDB();

// 6️⃣ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const authRoutes = require("./routes/auth"); // correct path
app.use("/api", authRoutes);

const protectedRoutes = require("./routes/protected"); // adjust path if needed
app.use("/api", protectedRoutes);
