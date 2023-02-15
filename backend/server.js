require("express-async-errors");
require("dotenv").config();
const express = require("express");
const connect = require("./db/connect");
const errorHandler = require("./midddleware/errorHandler");
const meetRouter = require("./routes/meet");
const userRouter = require("./routes/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/meets", meetRouter);
app.use("/api/v1/users", userRouter);

app.use(errorHandler);

const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
