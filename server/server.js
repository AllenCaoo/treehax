import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv'

import exerciseRouter from './routes/exercises.js';
import OHRouter from './routes/oh.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Connected to Mongo.");
});

app.use('/exercises', exerciseRouter)
app.use('/oh', OHRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
