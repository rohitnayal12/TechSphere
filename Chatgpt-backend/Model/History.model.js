const mongoose = require("mongoose");


//History Schema
const historySchema = mongoose.Schema({
    body: String,
    userID: String
}, {
    versionKey: false
})

const HistoryModel = mongoose.model("historie", historySchema);

module.exports = { HistoryModel };