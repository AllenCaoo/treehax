import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv'

import exerciseRouter from './routes/exercises.js';
import OHRouter from './routes/oh.js';

// Configure the .env file (not important)
dotenv.config();

// The app
const app = express();

// The port
const port = process.env.PORT || 5000;

// Same origin policy: "it is ok for client to take data/code from server"
app.use(cors());
app.use(express.json());

// The MongoDB identifier for our database
const uri = process.env.ATLAS_URI;
// Connect to mongoDB database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// Open connection
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to Mongo.");
});

// Our routes (aka pages i.e. www.ourwebsite.com/exercises)
app.use('/exercises', exerciseRouter)
app.use('/oh', OHRouter)

// Pretend www.ourwebsite.com is http://localhost:5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
