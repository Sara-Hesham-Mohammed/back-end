require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
const API_KEY = process.env.API_KEY;
function fetchNews(Url, res){
    axios.get(url)
    .then(respone =>{
        if(response.data.totalResults>0){
            res.json({
                status: 200,
                success: true,
                manage: "Success for fethcing data",
                data: respone.data
            });
        } else{
            res.json({
                status: 200,
                success: true,
                message: "no more results"
            });
        }
    })
    .catch(error => {
        res.json({
            status: 500,
            success: false,
            message: "failed to fetch data",
            error: error.message
        });
    });
}