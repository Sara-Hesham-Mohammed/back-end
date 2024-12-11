const { Schema, model } = require("mongoose");

const NewsSchema = new Schema({
    topicID:{
        type: String, 
        required: true
    },
    title: { 
        type: String, 
        required: true
     },
    content: { 
        type: String, 
        required: true
     },
    author: {
        type: String, 
        required: true
    },
    photoURL: { 
        type: String, 
        required: true 
    },
    publishedDateTime: { 
        type: Date, 
        required: true,
    },

    sourceURL: { 
        type: String, 
        required: true 
    },
});

const NewsModel = model('news', NewsSchema);

module.exports = NewsModel;
