export class Game {

  constructor(dataBase, req, res) {
    this.dataBase = dataBase;
    this.req = req;
    this.res = res;
  }


  //creating a new game
  async createGame() {
    const game = await this.dataBase("games")
      .insert({
        id: this.req.body.id,
        current_turn: this.req.body.current_turn,
        game_status: this.req.body.game_status,
        game_state: this.req.body.game_state
      })

    this.res.send("Game Info Saved");
  }

  //deleting a game by ID
  async deleteGame() {
    const game = await this.dataBase("games")
      .where({
        id: this.req.params.id
      })
      .del();
    this.res.send("Game Deleted Successfully")
  }

  //get moves by ID
  async getMoves() {
    const move = await this.dataBase("moves")
      .where({
        game_id: this.req.params.gameid
      })
    this.res.json(move)
  }

  //get all games
  async getAllGames() {
    const game = await this.dataBase("games")
    this.res.json(game)
  }

  //get game by id
  async getGame() {
    const game = await this.dataBase("games")
      .where({
        id: this.req.params.id
      })
    this.res.json(game)
  }

  //update game by id
  async updateGame() {
    const game = await this.dataBase("games")
      .where({
        id: this.req.params.id
      })
      .update({
        current_turn: this.req.body.current_turn,
        game_state: this.req.body.game_state,
        game_status: this.req.body.game_status
      })
    this.res.send("Game Updated Succesfully!")
  }

  //creating move of game
  async createMove() {
    const game = await this.dataBase("moves")
      .insert({
        id: this.req.body.id,
        piece_color: this.req.body.piece_color,
        piece_type: this.req.body.piece_type,
        source: this.req.body.source,
        destination: this.req.body.destination,
        game_id: this.req.params.gameid

      })
    this.res.send("moves added Succesfully!")
  }
}