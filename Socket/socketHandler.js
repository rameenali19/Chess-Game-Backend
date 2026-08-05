import Game from "../Service/Game.js";
export function socketHandler(io) {

  io.on("connection", (socket) => {

    //player joins the game
    socket.on("joinGame", ({ gameId, canJoin }) => {
      socket.gameId = parseInt(gameId);
      socket.join(gameId)

      //player 2 informs the player 1 on it's joining
      if (canJoin) {
        io.to(gameId).emit("playerJoined")
      }
    })

    //----------------------------------------------------------------------

    //recieving updated board and values 
    socket.on("gameUpdate", async ({ gameId, gameData }) => {
      socket.gameId = parseInt(gameId);

      //updatig the database 
      await Game.updateGame(
        gameData.turn,
        gameData.board,
        gameData.status,
        gameData.enPassant,
        gameData.promotion,
        gameId
      );

      //sending updated board and values 
      socket.to(gameId).emit("gameUpdate", gameData)
    })

    //------------------------------------------------------------------------

    //player gets disconnected
    socket.on("disconnect", async () => {
      const gameId = socket.gameId
      if (!gameId) return

      //updating the gameState to waiting 
      await Game.updateGameStatus(gameId, "waiting")

      //checking is the room is empty or other player is still connected
      const room = io.sockets.adapter.rooms.get(String(gameId))
      const remainingPlayer = room ? room.size : 0

      //send message to the remaining player
      if (remainingPlayer === 1) {
        socket.to(gameId).emit("opponentDisconnected", gameId)
      }
    })

  })
}