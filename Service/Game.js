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
        id: this.req.body.id
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
    const game = await this.dataBase("moves")
    this.res.json(game)
  }
}