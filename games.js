const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    "title": String,
    "date": {
        type: Date,
        format: "%Y-%m-%d"
    },
    "gameId": Number,
    "home": [{
        playerName: String,
        playerNumber: Number,
        points: Number,
        two_points: Number,
        two_points_attempt: Number,
        two_points_per: String,
        three_points: Number,
        three_points_attempt: Number,
        three_points_per: String,
        foul_points: Number,
        foul_points_attempt: Number,
        foul_points_per: String,
        offensive_rebound: Number,
        defensive_rebound: Number,
        all_rebound: Number,
        assists: Number,
        steals: Number,
        blocks: Number,
        turnOver: Number,
        foul: Number
    }],
    "away": [{
        playerName: String,
        playerNumber: Number,
        points: Number,
        two_points: Number,
        two_points_attempt: Number,
        two_points_per: String,
        three_points: Number,
        three_points_attempt: Number,
        three_points_per: String,
        foul_points: Number,
        foul_points_attempt: Number,
        foul_points_per: String,
        offensive_rebound: Number,
        defensive_rebound: Number,
        all_rebound: Number,
        assists: Number,
        steals: Number,
        blocks: Number,
        turnOver: Number,
        foul: Number
    }],
})

module.exports = mongoose.model("Game", gameSchema)

