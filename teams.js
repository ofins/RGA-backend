const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        unique: true,
    },
    players: [{
        name: String,
        number: Number,
    }],
})

module.exports = mongoose.model("Team", teamSchema)