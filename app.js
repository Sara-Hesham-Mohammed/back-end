const express = require('express');
const dotenv = require('dotenv');

//DB Connnection
const initiateDBConnection = require("./config/db");

dotenv.config({
    path: './config/.env'
});

const PORT = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
    res.send({
        name: "personName",
        age: 22
    });
})
app.use('/api/finnhub', require('./routes/finnhubRoute'));

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
    //init server first THEN DB
    await initiateDBConnection();
});