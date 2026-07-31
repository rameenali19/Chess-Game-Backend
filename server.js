//importing dotenv to get the sensitive information from .env file
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();

//importing express
import express from "express"

import { Game } from "./Service/Game.js";
import database from "./Knex.js";

//returning server
const app = express();

//converting the JSON text to  JavaScript object
app.use(express.json());

//cors
app.use(cors());

//API endpoints and handler functions calling the respective function from Game.js

//creating a new game
app.post("/games", async (req, res) => {
  const game = new Game(database, req, res);
  const response = await game.createGame();
  res.json(response.id)
})

//creating a new player
app.post("/games/:gameid/player", async (req, res) => {
  const player = new Game(database, req, res);
  const response = await player.joinGame();
  res.json(response)
})

//get player by game id
app.get("/games/:gameid/player", async (req, res) => {
  const player = new Game(database, req, res);
  const response = await player.getPlayer();
  res.json(response)
})

//deleting a game by id
app.delete("/games/:id", async (req, res) => {
  const game = new Game(database, req, res);
  const response = await game.deleteGame();
  res.json(response)
})

//get moves of game by id
app.get("/games/:gameid/moves", async (req, res) => {
  const moves = new Game(database, req, res);
  const response = await moves.getMoves();
  res.json(response)
})

//get all games
app.get("/games", async (req, res) => {
  const game = new Game(database, req, res);
  const response = await game.getAllGames();
  res.json(response)
})

//get game by id
app.get("/games/:id", async (req, res) => {
  const game = new Game(database, req, res);
  const response = await game.getGameAndPlayer();
  res.json(response)
})

//updating game by id
app.post("/games/:id", async (req, res) => {
  const game = new Game(database, req, res);
  const response = await game.updateGame();
  res.json(response)
})

//create move of game
app.post("/games/:gameid/moves", async (req, res) => {
  const move = new Game(database, req, res);
  const response = await move.createMove();
  res.json(response)
})

//create guestId
app.post("/guests", async (req, res) => {
  const guest = new Game(database, req, res);
  const response = await guest.createGuest();
  res.json(response)
})

//assigning port to the server
app.listen(3000, () => {
  console.log("Server is working!");
})

