
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
app.use(cors())

// mongoose.connect('mongodb://127.0.0.1:27017/myDB')
mongoose.connect('mongodb+srv://ofins:Password@nodeexpressproject.o28jccr.mongodb.net/?retryWrites=true&w=majority')

const Team = require('./teams')
const Game = require('./games')

// TEAM DB**

app.get('/teams', (req, res) => {
    find();
    async function find() {
        try {
            const teams = await Team.find()
            return res.json(teams)
        } catch (error) {
            console.log(error.message)
        }
    }
})

app.get('/', (req, res) => {
    res.json('this is RGA backend!')
})

app.delete('/teams/:id', (req, res) => {
    const teamId = req.params.team
    const playerId = req.params.id
    deleteOne();
    async function deleteOne() {
        try {
            const teams = await Team.updateOne({ "players._id": playerId }, { $pull: { players: { _id: playerId } } })
            return res.json(teams)
        } catch (error) {
            console.log(error)
        }
    }
})

app.delete('/teams/delete/:id', (req, res) => {
    const teamId = req.params.id
    deleteTeam();
    async function deleteTeam() {
        try {
            const teams = await Team.deleteOne({"_id": teamId})
            return res.json(teams)
        } catch (error) {
            console.log(error)
        }
    }
})

app.post('/teams', (req, res) => {
    add();
    async function add() {
        try {
            const teams = await Team.create({
                id: req.body.id,
                teamName: req.body.teamName,
                players: req.body.players
            })
            return res.json(teams)
        } catch (error) {
            console.log(error)
        }
    }
})

app.post('/teams/:id', (req,res) => {
    addPlayer();
    async function addPlayer() {
        try {
            const teams = await Team.updateOne(
                {
                    _id:req.body.teamId
                },
                {
                    $push:{
                        players:{
                            name: req.body.name,
                            number: req.body.number
                        }
                    }
                }
            )
            return res.json(teams)
        } catch (error) {
            console.log(error)
        }
    }
})

app.put('/teams/:id', (req, res) => {
    const playerId = req.params.id
    async function edit() {
        try {
            const teams = await Team.updateOne(
                {
                    "players._id": playerId
                },
                {
                    $set:{
                        "players.$.name": req.body.name,
                        "players.$.number": req.body.number
                    }
                }
            )
            return res.json(teams)
        } catch (error) {
            console.log(error)
        }
    }
    edit();
})

// GAME STATS DB**

app.get('/gamestats', (req, res) => {
    findGames();
    async function findGames() {
        try {
            const games = await Game.find()
            return res.json(games)
        } catch (error) {
            console.log(error)
        }
    }
})

app.post('/gamestats', (req, res) => {
    addGame();
    async function addGame() {
        try {
            const games = await Game.insertMany({
                "title": req.body.title,
                // "date": { $dateToString: {"date": req.body.date, "format": "%Y-%m-%d"}},
                "date":req.body.date,
                "gameID": req.body.gameId,
                "home": req.body.home,
                "away": req.body.away
            })
            return res.json(games)
        } catch (error) {
            console.log(error)
        }
    }
})

app.delete('/gamestats/:id', (req, res) => {
    const gameId = req.params.id
    deleteGame();
    async function deleteGame() {
        try {
            const games = await Game.deleteOne({
                "_id": gameId
            })
            return res.json(games)
        } catch (error) {
            
        }
    }
})


app.listen(5000, (req, res) => {
    console.log('listening on port 5000...')
})

