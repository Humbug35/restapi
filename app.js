//import express from 'express';
import router from './routes/index.js';


let express = require("express");
const app = express();
app.use(router);

const port = 5000;

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
