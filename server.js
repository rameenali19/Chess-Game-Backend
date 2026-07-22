//importing dotenv to get the sensitive information from .env file
import dotenv from "dotenv"
dotenv.config();

//importing express
import express from "express"

import { Game } from "./Service/Game.js";
import dataBase from "./Knex.js";

//returning server
const app = express();

//converting the JSON text to  JavaScript object
app.use(express.json());

//API endpoints and handler functions calling the respective function from Game.js

//creating a new game
app.post("/games", async (req, res) => {
  const game = new Game(dataBase, req, res);
  await game.createGame();
})

//deleting a game by id
app.delete("/games/:id", async (req, res) => {
  const game = new Game(dataBase, req, res);
  await game.deleteGame();
})

//get moves of game by id
app.get("/games/:gameid/moves", async (req, res) => {
  const moves = new Game(dataBase, req, res);
  await moves.getMoves();
})

//get all games
app.get("/games", async (req, res) => {
  const game = new Game(dataBase, req, res);
  await game.getAllGames();
})

//assigning port to the server
app.listen(3000, () => {
  console.log("Server is working!");
})


// Get All Games
// Get Single Game By Id
// Create Game   (done)
// Update Game
// Delete Game   (done)
// Get Moves of Game  (done)
// Create Move of Game 