import Game from "../Service/Game.js";
export function socketHandler(io) {

  io.on("connection", (socket) => {

    //player joins the game
    socket.on("joinGame", ({ gameId, canJoin }) => {
      gameId = String(gameId)
      socket.join(gameId)

      //player 2 informs the player 1 on it's joining
      if (canJoin) {

        io.to(gameId).emit("playerJoined")
      }
    })

    //----------------------------------------------------------------------

    //recieving updated board and values 
    socket.on("gameUpdate", async ({ gameId, gameData }) => {
      gameId = String(gameId)

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
    socket.on("leavingGame", async ({ gameId }) => {
      gameId = String(gameId)
      if (!gameId) return

      //updating the gameState to waiting 
      await Game.updateGameStatus(gameId, "waiting")

      //informing opponent about leaving
      socket.to(gameId).emit("opponentDisconnected")

      //leaving the game room
      socket.leave(gameId)

    })

  })
}