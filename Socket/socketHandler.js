export function socketHandler(io) {

  io.on("connection", (socket) => {

    socket.on("joinGame", ({ gameId, canJoin }) => {

      const resolvedRoom = parseInt(gameId);

      socket.join(resolvedRoom)
      if (canJoin) {
        io.to(resolvedRoom).emit("playerJoined")

      }
    })

  })

}