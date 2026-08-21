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
  //Get game by id and player
  {
    path: "/:id/player/:guestId",
    method: "get",
    handler: gameController.getGameAndPlayer
  },
  //Join game by id 
  {
    path: "/:id/join",
    method: "post",
    handler: gameController.joinGame
  },
  //Updating game by id
  {
    path: "/:id",
    method: "post",
    handler: gameController.updateGame
  },
  //Create move of game
  {
    path: "/:gameId/moves",
    method: "post",
    handler: gameController.createMove
  },
  //Create guestId
  {
    path: "/",
    method: "post",
    handler: gameController.createGuest
  }

]