export class Game {

  constructor(dataBase, req, res) {
    this.dataBase = dataBase;
    this.req = req;
    this.res = res;
  }

  //creating a new game
  async createGame() {
    const {
      current_turn, game_status, game_state, id
    } = this.req.body
    const game = await this.dataBase("games")
      .insert({
        id,
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
    const game = await this.dataBase("games")
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
    const move = await this.dataBase("moves")
      .where({
        game_id,
      })
    return move
  }

  //get all games
  async getAllGames() {
    const game = await this.dataBase("games")
    return game
  }

  //get game by id
  async getGame() {
    const id = this.req.params.id
    const game = await this.dataBase("games")
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
    const game = await this.dataBase("games")
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
      id, piece_color, piece_type, source, destination
    } = this.req.body
    const game_id = this.req.params.gameid
    const game = await this.dataBase("moves")
      .insert({
        id,
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