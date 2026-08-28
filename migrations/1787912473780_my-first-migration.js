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

  //Tables

  pgm.createTable("games", {
    id: {
      type: "integer",
      primaryKey: true,
      sequenceGenerated: {
        precedence: "BY DEFAULT"
      }
    },
    current_turn: {
      type: "text"
    },
    game_board: {
      type: "text[]"
    },
    game_status: {
      type: "game_status",
      notNull: true
    },
    en_passant: {
      type: "text"
    },
    promotion: {
      type: "text"
    },
    mode: {
      type: "mode"
    },
    delete: {
      type: "boolean",
      default: false
    },
    winner: {
      type: "winner"
    },
    end_reason: {
      type: "end_reason"
    }
  });

  pgm.createTable("guests", {
    id: {
      type: "uuid",
      primaryKey: true
    }
  });

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {


};
