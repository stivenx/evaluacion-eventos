const mongoose = require("mongoose");



const tareaSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    priority: {type: String, required: true},
    status: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}

});

module.exports = mongoose.model("Tarea", tareaSchema);