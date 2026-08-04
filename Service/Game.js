export class Game {

  constructor(database, req, res) {
    this.database = database;
    this.req = req;
    this.res = res;
  }

  //creating a new game
  async createGame() {

    const {
      currentTurn, gameBoard, gameStatus, enPassant, promotion, mode, playerColor, guestId
    } = this.req.body
    const game = await this.database("games")
      .insert({
        current_turn: currentTurn,
        game_board: gameBoard,
        game_status: gameStatus,
        en_passant: enPassant,
        promotion: promotion,
        mode: mode

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

    const player = await this.database("players")
      .where({
        game_id: id
      })
      .del();
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
    const guestId = this.req.query.guestId
    const page = this.req.query.page
    const limit = this.req.query.limit
    const offset = (page - 1) * limit
    const game = await this.database("games")

      .join("players", "games.id", "players.game_id")
      .where("players.guest_id", guestId)
      .select("games.*")
      .limit(limit)
      .offset(offset)
      .orderBy("id", "asc");
    return game
  }

  //get game by id and player
  async getGameAndPlayer() {
    const guestId = this.req.params.guestId
    const id = this.req.params.id
    const game = await this.database("games")
      .join("players", "games.id", "players.game_id")
      .where("players.guest_id", guestId)
      .select("games.*", "players.player_color")
      .where("games.id", id)
      .first();
    game.game_board = game.game_board.map(e => e.map(m => {
      return m != "." ? JSON.parse(m) : "."
    }))

    return game
  }

  //join game by id 
  async joinGame() {
    const id = this.req.params.id
    const guestId = this.req.body.guestId

    const game = await this.database("games")
      .join("players", "games.id", "players.game_id")
      .select("games.*", "players.player_color")
      .where("games.id", id)
      .first();

    if (!game || game.game_status !== "waiting") {
      return {
        message: "Invalid ID"
      }
    }

    const currentColor = game.player_color === "White" ? "Black" : "White";
    const player = await this.database("players")
      .insert({
        player_color: currentColor,
        game_id: game.id,
        guest_id: guestId
      })

    await this.database("games")
      .where({
        id: game.id
      })
      .update({
        game_status: "unfinished"
      })
    return {
      gameId: game.id,
      playerColor: currentColor
    }
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
    const guestId = this.req.query.guestId
    const gameId = this.req.params.gameid;
    const player = await this.database("players")
      .where({
        game_id: gameId,
        guest_id: guestId
      })
      .first();
    return player
  }
}