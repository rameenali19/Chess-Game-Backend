//Importing dotenv to get the sensitive information from .env file
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();

//Importing express
import express from "express"
import { createServer } from "http";
import { Server } from "socket.io"
import { socketHandler } from "./socket/socketHandler.js";
import { gameRoutes, guestRoutes } from "./routes/routesConfig.js";
import { setupRoutes } from "./routes/routeHandler.js";

//Returning server
const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  }
})

//Converting the JSON text to  JavaScript object
app.use(express.json());
//Cors
app.use(cors());

const gameRouter = express.Router();
const guestRouter = express.Router();

setupRoutes(gameRouter, gameRoutes);
setupRoutes(guestRouter, guestRoutes);

app.use("/games", gameRouter);
app.use("/guests", guestRouter);

//Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    error: err.message || "Internal Server Error",
  });
});

socketHandler(io)

//Assigning port to the server
httpServer.listen(3000, () => {
  console.log("Server is working!");
})

