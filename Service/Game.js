export class Game {

  constructor(database, req, res) {
    this.database = database;
    this.req = req;
    this.res = res;
  }

  //creating a new game
  async createGame() {

    const {
      currentTurn, gameBoard, gameStatus, enPassant, promotion, playerColor, guestId
    } = this.req.body
    const game = await this.database("games")
      .insert({
        current_turn: currentTurn,
        game_board: gameBoard,
        game_status: gameStatus,
        en_passant: enPassant,
        promotion: promotion,

      })
      .returning("*")
    const gameId = game[0].id;

    await this.database("players")
      .insert({
        player_color: playerColor,
        game_id: gameId,
        guest_id: guestId
      })
      .returning("*")
    return (game[0]);
  }

  //creating a new Player to join game 
  async joinGame() {
    const gameId = this.req.params.gameid;
    const {
      playerColor, guestId
    } = this.req.body
    const player = await this.database("players")
      .insert({
        player_color: playerColor,
        game_id: gameId,
        guest_id: guestId
      })
      .returning("*")
    return (player[0]);
  }

  //creating guest
  async createGuest() {
    const {
      guestId
    } = this.req.body
    const guest = await this.database("guests")
      .insert({
        id: guestId
      })
      .returning("*")
    return ("Guest created");
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
    const page = this.req.query.page
    const limit = this.req.query.limit
    const offset = (page - 1) * 10
    const game = await this.database("games")
      .limit(limit)
      .offset(offset)
      .orderBy("id", "asc");
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
    game.game_board = game.game_board.map(e => e.map(m => {
      return m != "." ? JSON.parse(m) : "."
    }))

    return game
  }

  //update game by id
  async updateGame() {
    const {
      currentTurn, gameBoard, gameStatus, enPassant, promotion
    } = this.req.body
    const id = this.req.params.id
    const game = await this.database("games")
      .where({
        id,
      })
      .update({
        current_turn: currentTurn,
        game_board: gameBoard,
        game_status: gameStatus,
        en_passant: enPassant,
        promotion: promotion
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

  //get player by games ID
  async getPlayer() {
    const gameId = this.req.params.gameid;
    const guestId = this.req.body
    const player = await this.database("players")
      .where({
        game_id: gameId,
        guest_id: guestId
      })
      .first();
    return player
  }
}