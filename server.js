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

//deleting a game
app.delete("/game/id", async (req, res) => {
  const game = new Game(dataBase, req, res);
  await game.deleteGame();
})

//assigning port to the server
app.listen(3000, () => {
  console.log("Server is working!");
})

// GamesService
// - member: db
// Get All Games
// Get Single Game By Id
// Create Game   (done)
// Update Game
// Delete Game   (done)
// Get Moves of Game
// Create Move of Game 