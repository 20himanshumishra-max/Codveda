const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT ? process.env.PORT : 3000;
app.listen(port, () => {
  console.log("Server is up at http://localhost:" + port);
});
