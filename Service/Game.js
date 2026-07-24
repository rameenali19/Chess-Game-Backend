export class Game {

  constructor(database, req, res) {
    this.database = database;
    this.req = req;
    this.res = res;
  }

  //creating a new game
  async createGame() {

    const {
      currentTurn, gameStatus, gameState
    } = this.req.body
    const game = await this.database("games")
      .insert({
        current_turn: currentTurn,
        game_status: gameStatus,
        game_state: gameState
      })
      .returning("*")
    return (game[0]);
  }

  //deleting a game by ID
  async deleteGame() {
    const id = this.req.params.id;
    const game = await this.database("games")
      .where({
        id: id
      })
      .del();
    return {
      message: "Game Deleted Successfully"
    }
  }

  //get moves by ID
  async getMoves() {
    const gameId = this.req.params.gameid;
    const move = await this.database("moves")
      .where({
        game_id: gameId
      })
    return move
  }

  //get all games
  async getAllGames() {
    const game = await this.database("games")
    return game
  }

  //get game by id
  async getGame() {
    const id = this.req.params.id
    const game = await this.database("games")
      .where({
        id: id
      })
      .first();

    game.game_status = game.game_status.map(e => e.map(m => {
      return m != "." ? JSON.parse(m) : "."
    }))
    return game
  }

  //update game by id
  async updateGame() {
    const {
      currentTurn, gameState, gameStatus
    } = this.req.body
    const id = this.req.params.id
    const game = await this.database("games")
      .where({
        id,
      })
      .update({
        current_turn: currentTurn,
        game_state: gameState,
        game_status: gameStatus
      })
    return {
      message: "Game Updated Succesfully!"
    }
  }

  //creating move of game
  async createMove() {
    const {
      pieceColor, pieceType, source, destination
    } = this.req.body
    const gameId = this.req.params.gameid
    const game = await this.database("moves")
      .insert({
        piece_color: pieceColor,
        piece_type: pieceType,
        source: source,
        destination: destination,
        game_id: gameId
      })
    return {
      message: "moves added Succesfully!"
    }
  }
}