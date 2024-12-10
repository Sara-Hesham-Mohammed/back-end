const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

//DB Connnection
const initiateDBConnection = require("./config/db");

const repostsRouter = require('./routes/reposts');

dotenv.config({
    path: './config/.env'
});

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(cors());

app.use('/reposts', repostsRouter);

app.get("/", (req, res) => {
    res.send({
        name: "personName",
        age: 22
    });
})

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
    //init server first THEN DB
    await initiateDBConnection();
});