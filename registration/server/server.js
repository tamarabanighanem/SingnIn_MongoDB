require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const port = process.env.PORT || 3500;
const notFoundHandler = require('../middleware/404');
const errorHandler = require('../middleware/500');
app.use(cors());
app.use(express.json());


const userRouter = require('../routes/userRouter');
app.use(userRouter);


app.get('/', (req, res) => res.send('Hello World!'))
app.use('*', notFoundHandler);
app.use(errorHandler);


module.exports = {
  server: app,
  start: () => {
    mongoose
      .connect(process.env.mongooseURL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        app.listen(port, () => {
          console.log(`Starting server on port ${port}`);
        });
      });
  },
};