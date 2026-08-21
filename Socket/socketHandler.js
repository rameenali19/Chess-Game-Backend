import Game from "../service/Game.js";
export function socketHandler(io) {

  io.on("connection", (socket) => {

    //Player joins the game
    socket.on("joinGame", async ({ gameId }) => {

      gameId = String(gameId)   //Converting to string
      socket.gameId = gameId
      socket.join(gameId)    //Joining the game

      const room = io.sockets.adapter.rooms.get(gameId);
      const players = room ? room.size : 0;
      console.log(`Room ${gameId} has ${players} player(s)`);

      const status = await Game.getGame(gameId)
      if (status.game_status === "finished")
        return

      if (players === 1) {
        socket.emit("waitingScreen")
        io.to(gameId).emit("opponentDisconnected")
      }
      if (players === 2) {
        await Game.updateGameStatus(gameId, "unfinished");
        console.log("SERVER EMIT:", { gameId });
        io.to(gameId).emit("playerJoined", { gameId })
        socket.to(gameId).emit("opponentReconnected")
      }

    })

    //Recieving updated board and values 
    socket.on("gameUpdate", async ({ gameId, gameData }) => {
      gameId = String(gameId)
      socket.gameId = gameId
      //Updatig the database 
      await Game.updateGame(
        gameData.turn,
        gameData.board,
        gameData.status,
        gameData.enPassant,
        gameData.promotion,
        gameData.winner,
        gameData.endReason,
        gameId
      );

      //Sending updated board and values 
      socket.to(gameId).emit("gameUpdate", gameData)
    })

    //Creating moves
    socket.on("createMove", async ({ gameId, moveData }) => {
      gameId = String(gameId)
      socket.gameId = gameId
      //Updatig the database 
      await Game.createMove(
        moveData.pieceColor,
        moveData.pieceType,
        moveData.source,
        moveData.destination,
        gameId
      );
      socket.to(gameId).emit("moveCreated", moveData);
    })


    //Player gets disconnected
    socket.on("leavingGame", async ({ gameId }) => {
      const id = socket.gameId
      if (!id) return
      //Leaving the game room
      socket.leave(id)

      //Updating the gameState to waiting 

      const room = io.sockets.adapter.rooms.get(id);
      const players = room ? room.size : 0;

      const status = await Game.getGame(id)
      if (status.game_status === "finished")
        return

      if (players === 1) {
        await Game.updateGameStatus(id, "waiting")
        //Informing opponent about leaving
        socket.to(gameId).emit("opponentDisconnected")
      }

    })

  })
}