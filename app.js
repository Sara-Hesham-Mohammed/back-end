const express = require('express');
const dotenv = require('dotenv');

//DB Connnection
const initiateDBConnection = require("./config/db");
const authRouter = require('./routes/authroutes');

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

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
    //init server first THEN DB
    await initiateDBConnection();
});

app.use('/auth', authRouter);