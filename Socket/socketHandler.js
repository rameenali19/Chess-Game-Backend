import Game from "../Service/Game.js";
export function socketHandler(io) {

  io.on("connection", (socket) => {

    socket.on("joinGame", ({ gameId, canJoin }) => {
      const resolvedRoom = parseInt(gameId);
      socket.join(resolvedRoom)

      if (canJoin) {
        io.to(resolvedRoom).emit("playerJoined")
      }
    })

    socket.on("gameUpdate", async ({ gameId, gameData }) => {
      const resolvedRoom = parseInt(gameId);

      await Game.updateGame(
        gameData.turn,
        gameData.board,
        gameData.status,
        gameData.enPassant,
        gameData.promotion,
        gameId
      );
      socket.to(resolvedRoom).emit("gameUpdate", gameData)
    })

  })
}