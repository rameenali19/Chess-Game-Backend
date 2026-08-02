export function socketHandler(io) {

  io.on("connection", (socket) => {
    console.log("user connected")

    socket.on("joinGame", ({ gameId, canJoin }) => {
      socket.join(gameId)
      if (canJoin) {
        io.to(gameId).emit("playerJoined")
      }
    })

  })

}