export function socketHandler(io) {

  io.on("connection", (socket) => {
    console.log("user connected")

    socket.on("joinGame", (gameId) => {
      socket.join(gameId)
    })

  })

}