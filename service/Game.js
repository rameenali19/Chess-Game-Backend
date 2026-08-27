import database from "../Knex.js";
export class Game {

  //Creating a new game
  async createGame(currentTurn, gameBoard, gameStatus, enPassant, promotion, mode, playerColor, guestId) {

    const game = await database("games")
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

    await database("players")
      .insert({
        player_color: playerColor,
        game_id: gameId,
        guest_id: guestId
      })
      .returning("*")
    return (game[0].id);
  }

  //Creating guest
  async createGuest(guestId) {

    const guest = await database("guests")
      .insert({
        id: guestId
      })
      .returning("*")
    return ("Guest created");
  }

  //Deleting a game by ID
  async deleteGame(id) {

    const game = await database("games")
      .where({
        id: id
      })
      .update({
        delete: true
      });

    return {
      message: "Game Deleted Successfully"
    }
  }

  // Get moves by ID
  async getMoves(gameId) {
    const move = await database("moves")
      .where({
        game_id: gameId
      })
      .select(
        "piece_color as pieceColor",
        "piece_type as pieceType",
        "source",
        "destination"
      );
    return move
  }

  //Get all games
  async getAllGames(guestId, page, limit, offset, status) {

    const query = database("games")
      .join("players", "games.id", "players.game_id")
      .where("players.guest_id", guestId)
      .select("games.*")
      .where({
        delete: false
      })

    if (status === "unfinished") {
      query.whereIn("game_status", ["waiting", "unfinished"])
    }
    else if (status) {
      query.where({
        game_status: status
      })
    }
    const game = await query
      .limit(limit)
      .offset(offset)
      .orderBy("id", "asc");
    return game
  }

  //Get game by id and player
  async getGameAndPlayer(guestId, id) {

    const game = await database("games")
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

  //Join game by id 
  async joinGame(id, guestId) {

    const gameExists = await database("games")
      .where({
        id,
        delete: false
      })
      .first();

    if (!gameExists || gameExists.game_status !== "waiting" || gameExists.mode !== "multiplayer") {
      return {
        message: "Invalid ID"
      };
    }

    const previousPlayer = await database("players")
      .where({
        guest_id: guestId,
        game_id: id
      })
      .first()

    if (previousPlayer) {
      return
    }

    const game = await database("games")
      .join("players", "games.id", "players.game_id")
      .select("games.*", "players.player_color")
      .where("games.id", id)
      .first();

    if (!game || game.game_status !== "waiting" || game.mode !== "multiplayer") {
      return {
        message: "Invalid ID"
      }
    }
    const currentColor = game.player_color === "White" ? "Black" : "White";
    const player = await database("players")
      .insert({
        player_color: currentColor,
        game_id: game.id,
        guest_id: guestId
      })
    return {
      gameId: game.id,
      playerColor: currentColor,
    }
  }


  //Update game by id
  async updateGame(currentTurn, gameBoard, gameStatus, enPassant, promotion, winner, endReason, id) {

    const game = await database("games")
      .where({
        id
      })
      .update({
        current_turn: currentTurn,
        game_board: gameBoard,
        game_status: gameStatus,
        en_passant: enPassant,
        promotion: promotion,
        winner: winner,
        end_reason: endReason
      })
    return {
      message: "Game Updated Succesfully!"
    }
  }

  //Creating move of game
  async createMove(pieceColor, pieceType, source, destination, gameId) {

    const game = await database("moves")
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

  //Get player by games ID
  async getPlayer(guestId, gameId) {

    const player = await database("players")
      .where({
        game_id: gameId,
        guest_id: guestId
      })
      .first();
    return player
  }

  //Update game status
  async updateGameStatus(gameId, status) {
    const game = await database("games")
      .where({
        id: gameId,
      })
      .update({
        game_status: status
      })
  }

  //Get total games
  async getTotalGames(guestId, status) {
    const query = database("games")
      .join("players", "games.id", "players.game_id")
      .where("players.guest_id", guestId)
      .where({
        delete: false
      })
    if (status === "unfinished") {
      query.whereIn("game_status", ["waiting", "unfinished"])
    }
    else if (status) {
      query.where({
        game_status: status
      })
    }
    const totalGames = await query
      .countDistinct("games.id as count")
      .first()

    return Number(totalGames.count)
  }

  //Get game by ID
  async getGame(id) {
    const game = await database("games")
      .where({
        id: id
      })
      .first()

    return (game)
  }
}
export default new Game();