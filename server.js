//importing dotenv to get the sensitive information from .env file
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();

//importing express
import express from "express"
import { createServer } from "http";
import { Server } from "socket.io"
import { socketHandler } from "./socket/socketHandler.js";
import gameController from "./controller/gameController.js"


//returning server
const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  }
})

//converting the JSON text to  JavaScript object
app.use(express.json());

//cors
app.use(cors());

//API endpoints and handler functions calling the respective function from Game.js

// //creating a new game
// app.post("/games", async (req, res) => {
//   const response = await gameController.createGame(req);
//   res.json(response.id)
// })


// //get player by game id
// app.get("/games/:gameId/player", async (req, res) => {
//   const response = await gameController.getPlayer(req);
//   res.json(response)
// })

//deleting a game by id
// app.delete("/games/:id", async (req, res) => {
//   const response = await gameController.deleteGame(req);
//   res.json(response)
// })

//get moves of game by id
// app.get("/games/:gameId/moves", async (req, res) => {
//   const response = await gameController.getMoves(req);
//   res.json(response)
// })

// //get all games
// app.get("/games", async (req, res) => {
//   const response = await gameController.getAllGames(req);
//   res.json(response)
// })

//get game by id and player
app.get("/games/:id/player/:guestId", async (req, res) => {
  const response = await gameController.getGameAndPlayer(req);
  res.json(response)
})

//join game by id 
app.post("/games/:id/join", async (req, res) => {
  const response = await gameController.joinGame(req);
  res.json(response)
})

//updating game by id
app.post("/games/:id", async (req, res) => {
  const response = await gameController.updateGame(req);
  res.json(response)
})

//create move of game
app.post("/games/:gameId/moves", async (req, res) => {
  const response = await gameController.createMove(req);
  res.json(response)
})

//create guestId
app.post("/guests", async (req, res) => {
  const response = await gameController.createGuest(req);
  res.json(response)
})

socketHandler(io)

//assigning port to the server
httpServer.listen(3000, () => {
  console.log("Server is working!");
})

