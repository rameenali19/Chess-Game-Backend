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


  pgm.createTable("players", {
    id: {
      type: "integer",
      primaryKey: true,
      sequenceGenerated: {
        precedence: "BY DEFAULT"
      }
    },
    player_color: {
      type: "text"
    },
    game_id: {
      type: "integer",
      references: "games(id)",
      notNull: true
    },
    guest_id: {
      type: "uuid",
      references: "guests(id)",
      notNull: true
    }
  });

  pgm.createTable("moves", {
    id: {
      type: "integer",
      primaryKey: true,
      sequenceGenerated: {
        precedence: "BY DEFAULT"
      }
    },
    piece_color: {
      type: "text",
      notNull: true
    },
    piece_type: {
      type: "piece"
    },
    source: {
      type: "text"
    },
    destination: {
      type: "text"
    },
    game_id: {
      type: "integer",
      notNull: true,
      references: "games(id)"
    }
  });

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("moves");
  pgm.dropTable("players");
  pgm.dropTable("guests");
  pgm.dropTable("games");

  pgm.dropType("piece");
  pgm.dropType("end_reason");
  pgm.dropType("winner");
  pgm.dropType("mode");
  pgm.dropType("game_status");


};
