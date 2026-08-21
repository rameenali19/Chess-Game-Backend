import gameController from "../controllers/gameController.js";

export const gameRoutes = [
  //Creating new game
  {
    path: "/",
    method: "post",
    handler: gameController.createGame
  },
  //Get player by game id
  {
    path: "/:gameId/player",
    method: "get",
    handler: gameController.getPlayer
  },
  //Deleting a game by id
  {
    path: "/:id",
    method: "delete",
    handler: gameController.deleteGame
  },
  //Get moves of game by id
  {
    path: "/:gameId/moves",
    method: "get",
    handler: gameController.getMoves
  },
  //Get all games
  {
    path: "/",
    method: "get",
    handler: gameController.getAllGames
  },
]