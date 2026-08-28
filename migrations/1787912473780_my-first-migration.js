/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  //Enum types

  pgm.createType("game_status", [
    "finished",
    "unfinished",
    "waiting"
  ]);

  pgm.createType("mode", [
    "singleplayer",
    "multiplayer",
    "ai"
  ]);

  pgm.createType("winner", [
    "White",
    "Black",
    "Draw"
  ]);

  pgm.createType("end_reason", [
    "checkmate",
    "stalemate",
    "resignation"
  ]);

  pgm.createType("piece", [
    "Pawn",
    "King",
    "Queen",
    "Bishop",
    "Knight",
    "Rook"
  ]);

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {


};
