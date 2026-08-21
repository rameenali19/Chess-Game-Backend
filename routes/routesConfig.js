import GameController from "../controller/gameController.js";

export const gameRoutes = [
  //Creating new game
  {
    path: "/",
    method: "post",
    controller: GameController,
    handler: "createGame"
  },
  //Get player by game id
  {
    path: "/:gameId/player",
    method: "get",
    controller: GameController,
    handler: "getPlayer"
  },
  //Deleting a game by id
  {
    path: "/:id",
    method: "delete",
    controller: GameController,
    handler: "deleteGame"
  },
  //Get moves of game by id
  {
    path: "/:gameId/moves",
    method: "get",
    controller: GameController,
    handler: "getMoves"
  },
  //Get all games
  {
    path: "/",
    method: "get",
    controller: GameController,
    handler: "getAllGames"
  },
  //Get game by id and player
  {
    path: "/:id/player/:guestId",
    method: "get",
    controller: GameController,
    handler: "getGameAndPlayer"
  },
  //Join game by id 
  {
    path: "/:id/join",
    method: "post",
    controller: GameController,
    handler: "joinGame"
  },
  //Updating game by id
  {
    path: "/:id",
    method: "post",
    controller: GameController,
    handler: "updateGame"
  },
  //Create move of game
  {
    path: "/:gameId/moves",
    method: "post",
    controller: GameController,
    handler: "createMove"
  },
]

export const guestRoutes = [
  //Create guestId
  {
    path: "/",
    method: "post",
    controller: GameController,
    handler: "createGuest"
  }

]