/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {

  // ---------- ENUMS ----------

  await knex.raw(`
    CREATE TYPE game_status_enum AS ENUM (
      'finished',
      'unfinished',
      'waiting'
    )
  `);

  await knex.raw(`
    CREATE TYPE game_mode_enum AS ENUM (
      'singleplayer',
      'multiplayer',
      'ai'
    )
  `);

  await knex.raw(`
    CREATE TYPE winner_enum AS ENUM (
      'white',
      'black',
      'draw'
    )
  `);

  await knex.raw(`
    CREATE TYPE end_reason_enum AS ENUM (
      'checkmate',
      'stalemate',
      'resignation'
    )
  `);

  await knex.raw(`
    CREATE TYPE piece_type_enum AS ENUM (
      'Pawn',
      'King',
      'Queen',
      'Bishop',
      'Knight',
      'Rook'
    )
  `);


  // ---------- GAMES ----------

  await knex.schema.createTable("games", (table) => {

   table.increments("id");
    table.text("current_turn");

    table.specificType("game_board", "text[]");

    table
      .specificType("game_status", "game_status_enum")
      .notNullable();

    table.text("en_passant");

    table.text("promotion");

    table.specificType("mode", "game_mode_enum");

    table.boolean("delete").defaultTo(false);

    table.specificType("winner", "winner_enum");

    table.specificType("end_reason", "end_reason_enum");
  });


  // ---------- GUESTS ----------

  await knex.schema.createTable("guests", (table) => {

    table
      .uuid("id")
      .primary();
  });


  // ---------- PLAYERS ----------

  await knex.schema.createTable("players", (table) => {

    table.increments("id");

    table.text("player_color");

    table
      .integer("game_id")
      .notNullable()
      .references("id")
      .inTable("games");

    table
      .uuid("guest_id")
      .notNullable()
      .references("id")
      .inTable("guests");
  });


  // ---------- MOVES ----------

  await knex.schema.createTable("moves", (table) => {

   table.increments("id");

    table.text("piece_color").notNullable();

    table.specificType("piece_type", "piece_type_enum");

    table.text("source");

    table.text("destination");

    table
      .integer("game_id")
      .notNullable()
      .references("id")
      .inTable("games");
  });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {

  // Drop tables in reverse dependency order
  await knex.schema.dropTableIfExists("moves");
  await knex.schema.dropTableIfExists("players");
  await knex.schema.dropTableIfExists("guests");
  await knex.schema.dropTableIfExists("games");

  // Drop enums
  await knex.raw(`DROP TYPE IF EXISTS piece_type_enum`);
  await knex.raw(`DROP TYPE IF EXISTS end_reason_enum`);
  await knex.raw(`DROP TYPE IF EXISTS winner_enum`);
  await knex.raw(`DROP TYPE IF EXISTS game_mode_enum`);
  await knex.raw(`DROP TYPE IF EXISTS game_status_enum`);
};