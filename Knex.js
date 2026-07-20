import knex from "knex";
const dataBase = knex({
  client: "pg",

  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "rameen537",
    database: "chess_db"
  }
});

export default dataBase;