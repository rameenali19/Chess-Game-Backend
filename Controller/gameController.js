import Game from "../Service/Game.js";

class gameController {
  async createGame(req) {
    const {
      currentTurn, gameBoard, gameStatus, enPassant, promotion, mode, playerColor, guestId
    } = req.body
    const result = await Game.createGame(
      currentTurn,
      gameBoard,
      gameStatus,
      enPassant,
      promotion,
      mode,
      playerColor,
      guestId
    )
    return (result);
  }

  //creating guest
  async createGuest(req) {
    const { guestId } = req.body
    const result = await Game.createGuest(guestId)
    return (result);
  }

  //deleting a game by ID
  async deleteGame(req) {
    const { id } = req.params;
    const result = await Game.deleteGame(id)
    return (result)
  }

  //get moves by ID
  async getMoves(req) {
    const { gameId } = req.params
    const result = await Game.getMoves(gameId)
    return (result)
  }

  //get all games
  async getAllGames(req) {
    const { guestId, status } = req.query
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const offset = (page - 1) * limit
    const total = await Game.getTotalGames(guestId)
    const result = await Game.getAllGames(guestId, page, limit, offset, status)
    return ({ result, total })
  }

  //get game by id and player
  async getGameAndPlayer(req) {
    console.log("GET GAME", req.params);
    const { id, guestId } = req.params
    const result = await Game.getGameAndPlayer(guestId, id)
    return (result)
  }

  //join game by id 
  async joinGame(req) {
    console.log("JOIN API", req.params);
    const { id } = req.params
    const { guestId } = req.body
    const result = await Game.joinGame(id, guestId)

    return (result)
  }

  //update game by id
  async updateGame(req) {
    console.log("UPDATE GAME", req.params);
    const {
      currentTurn, gameBoard, gameStatus, enPassant, promotion, winner, endReason
    } = req.body
    const { id } = req.params
    const result = await Game.updateGame(currentTurn, gameBoard, gameStatus, enPassant, promotion, winner, endReason, id)
    return (result)
  }

  //creating move of game
  async createMove(req) {
    const {
      pieceColor, pieceType, source, destination
    } = req.body
    const { gameId } = req.params
    const result = await Game.createMove(pieceColor, pieceType, source, destination, gameId)
    return (result)
  }

  //get player by games ID
  async getPlayer(req) {
    const { guestId } = req.query
    const { gameId } = req.params
    const result = await Game.getPlayer(guestId, gameId)

    return (result)
  }

  //Get game by ID
  async getGame(req) {
    const { id } = req.params
    const result = await Game.getGame(gameId)

    return (result)
  }
}
export default new gameController