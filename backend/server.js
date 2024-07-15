const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const userRouter = require("./routes/users");
const arFormRouter = require("./routes/arforms");
app.use("/api/users", userRouter);
app.use("/api/arforms", arFormRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
