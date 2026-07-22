export class Game {

  constructor(database, req, res) {
    this.database = database;
    this.req = req;
    this.res = res;
  }

  //creating a new game
  async createGame() {
    const {
      current_turn, game_status, game_state
    } = this.req.body
    const game = await this.database("games")
      .insert({
        current_turn,
        game_status,
        game_state
      })
    return {
      message: "Game Info Saved"
    };
  }

  //deleting a game by ID
  async deleteGame() {
    const id = this.req.params.id;
    const game = await this.database("games")
      .where({
        id,
      })
      .del();
    return {
      message: "Game Deleted Successfully"
    }
  }

  //get moves by ID
  async getMoves() {
    const game_id = this.req.params.gameid;
    const move = await this.database("moves")
      .where({
        game_id,
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
        id,
      })
    return game
  }

  //update game by id
  async updateGame() {
    const {
      current_turn, game_state, game_status
    } = this.req.body
    const id = this.req.params.id
    const game = await this.database("games")
      .where({
        id,
      })
      .update({
        current_turn,
        game_state,
        game_status
      })
    return {
      message: "Game Updated Succesfully!"
    }
  }

  //creating move of game
  async createMove() {
    const {
      piece_color, piece_type, source, destination
    } = this.req.body
    const game_id = this.req.params.gameid
    const game = await this.database("moves")
      .insert({
        piece_color,
        piece_type,
        source,
        destination,
        game_id
      })
    return {
      message: "moves added Succesfully!"
    }
  }
}