export class Game {

  constructor(dataBase, req, res) {
    this.dataBase = dataBase;
    this.req = req;
    this.res = res;
  }

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

  async deleteGame() {
    const game = await this.dataBase("games")
      .where({
        id: this.req.body.id
      })
      .del();
    this.res.send("Game Deleted Successfully")
  }
}