import 'dotenv/config.js'
import express from "express";
import bugRouter from "./routers/bugRouter.js";
import mongoose from "mongoose";
import cors from 'cors'
import userRouter from './routers/userRouter.js';

// create express app
const app = express();
// server port
const port = process.env.PORT || 3000;
// db URI
const DB_URI = process.env.DB_URI

// connect to the database
mongoose.connect(DB_URI)
    .then(() => {
        app.listen(port, () => console.log(`server is live on port ${port}`))
    })
    .catch(error => console.log(error.message))


// avoid cors error on browser
app.use(cors())

// parse incoming requests with JSON payloads
app.use(express.json());

// handle requests to this path(& sub-paths) using this router
app.use('/api/bugs', bugRouter);
app.use('/api/user', userRouter);