import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// [CONFIGURE SERVER PORT]
const port = process.env.PORT || 4500;
const app = express();

// [CONFIGURE APP TO USE bodyParser]
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfuly connected to mongodb'))
    .catch(e => console.error(e));

// [CONFIGURE ROUTER]
import api from './routes/index.js'
app.use('/api', api);

// [RUN SERVER]
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});