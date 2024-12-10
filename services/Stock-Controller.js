const User = require('../models/user.model.js');
const axios = require('axios');
const moment = require('moment');
const findStockInWatchlist = require('../utils/findStockInWatchlist.js');
require('dotenv').config();

let cache = {
    // profile cached for 1 week
    // search cached for 1 week; pushed into db
    // financials cached for 1 day
    // candlestick (timeseries) data cached for 1 minute
    // quote data cached for 1 minute
};

// looks as refresh date in the cache and compares to current unix time
const requireRefresh = (params) => {
    let currentTime = moment().unix(); // get current time in unix
    let refreshTime;
    try {
    if (params.hasOwnProperty('interval')) {
        refreshTime = cache[params.symbol][params.interval]['refreshDateUnix'];
    } else if (params.hasOwnProperty('stockSearch')) {
        refreshTime = cache['stockSearch']['refreshDateUnix'];
    } else {
        refreshTime = cache[params.symbol][params.property]['refreshDateUnix'];
    }
    return currentTime > refreshTime ? true : false;
    } catch (err) {
        console.log('Error in requireRefresh function');
    }
};

module.exports = {
    stocks: {
        get: {
            stockById: (req, res) => {
                User.findById(req.query.userID)
                    .then(user => res.json(user.watchlist))
                    .catch(err => res.status(400).json("Error: " + err));
            },
        },
        post: {
            newStock: async (req, res) => {
                
                // query to see if stock already exists
                let query = { 
                    "_id": req.query.userID, 
                    "watchlist.company": req.body.watchlist.company 
                };

                findStockInWatchlist(query)
                    .then(response => {
                        User.findByIdAndUpdate(
                            req.query.userID,
                            {
                                // push new stock to watchlist array
                                $push: {
                                    'watchlist': req.body.watchlist
                                }
                            },
                            {
                                safe: true,
                                new: true,
                                upsert: true
                            },
                            (err, result) => {
                                if (err) {
                                    console.log('Error adding to watchlist:', err)
                                    res.status(400).json({ "Error": err });
                                } else {
                                    res.status(201).json(result);
                                }
                            }
                        )
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(409).json({ "Error": err });
                    });
            }
        },
        delete: {
            removeStock: (req, res) => {
                console.log(req.body)
                User.findByIdAndUpdate(
                    req.params.userID,
                    {
                        $pull: {
                            'watchlist': req.body.stock
                        }
                    },
                    {
                        safe: true,
                        new: false,
                        upsert: true
                    },
                    (err, result) => {
                        if (err) {
                            console.log('Error removing stock from watchlist:', err)
                            res.status(400).json({ "Error": err });
                        } else {
                            console.log('Removed stock to watchlist', result)
                            res.status(200).json(result);
                        }
                    }
                )
            }
        },
        
        // alphavantage used for symbol search only
        alphavantage: {
            stocks: {
                search: (req, res) => {
                    axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.params.keywords}&apikey=${process.env.STOCK_API_KEY}`)
                        .then(response => res.json(response.data))
                        .catch(err => res.status(400).json("Error" + err));
                }
            }
        }
    },
};