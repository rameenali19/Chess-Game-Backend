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
  }
]