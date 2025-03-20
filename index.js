// const express = require('express')   require() function is equivalent to the "import" keyword in React which loads a libary into the local source. 
import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";

const app = express()   // express() function call creates an instance of the express library and assigns it to local constant "app"
app.use(cors()); 
app.use(express.json()); // enable the server to parse JSON data from request body
Hello(app)
Lab5(app);
app.listen(process.env.PORT || 4000)
