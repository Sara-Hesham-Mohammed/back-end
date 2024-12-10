const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

//DB Connnection
const initiateDBConnection = require("./config/db");
const authRouter = require('./routes/authroutes');


const newsRouter = require('./routes/news');

//this fn loads all the env vars from the .env file
dotenv.config({
    path: './config/.env'
});

const PORT = process.env.PORT;
const app = express();


app.use(express.json());
app.use(cors());

app.use('/', newsRouter);
app.use('/api/finnhub', require('./routes/finnhubRoute'));

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
    //init server first THEN DB
    await initiateDBConnection();
});


app.use('/auth', authRouter);