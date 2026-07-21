import express from "express"
import { dbFunction } from "./db.js";

const app = express();

app.use(express.json());

function handler(req, res) {

  console.log("Handler reached!");

  const {
    game_id,
    white_player,
    black_player,
    results
  } = req.body;

  dbFunction(game_id, white_player, black_player, results);

  res.status(202).json({
    message: "Game Saved"
  });
}

app.post("/api/games", handler)

app.listen(3000, () => {
  console.log("Server is working");
})

// GamesService 
// - member: db 
// Get All Games 
// Get Single Game By Id
// Create Game 
// Update Game 
// Delete Game 
// Get Moves of Game 
// Create Move of Game 