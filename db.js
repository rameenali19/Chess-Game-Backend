import dataBase from "./Knex.js";
export async function dbFunction(game_id, white_player, black_player, results) {
  await dataBase.raw(`
    insert into game(game_id,white_player,black_player,results)
    values (?,?,?,?);
    `,
    [
      game_id, white_player, black_player, results
    ]

  )
}


