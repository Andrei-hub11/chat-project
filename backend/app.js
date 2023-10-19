const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const app = express();

const { errorHandler } = require("./middleware/errorMiddleware.js");
const connectDB = require("./config/db.js");

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes.js"));

app.use(errorHandler);

module.exports = app;
