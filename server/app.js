const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();
app.use(express.json({ extended: false }));
app.use(cors());
app.get("/", (req, res) => res.json({ msg: "Welcome" }));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/flowers", require("./routes/flowers"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) =>
  console.log(`Welcome. Server running on ${PORT}`)
);
