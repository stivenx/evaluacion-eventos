const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: Date, required: true},
    time: {
        start: {type: String, required: true, match: /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM|am|pm)$/ },
        end: {type: String, required: true, match: /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM|am|pm)$/ }
     },
    description: {type: String, required: true},
    location: {type: String, required: true},

});

module.exports = mongoose.model("Event", eventSchema);
    