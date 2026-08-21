//importing dotenv to get the sensitive information from .env file
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();

//importing express
import express from "express"
import { createServer } from "http";
import { Server } from "socket.io"
import { socketHandler } from "./socket/socketHandler.js";
import { gameRoutes } from "./routes/routesConfig.js";
import guestRoutes from "./routes/guestRoutes.js";

//returning server
const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  }
})

//converting the JSON text to  JavaScript object
app.use(express.json());

app.use("/games", gameRoutes);
app.use("/guests", guestRoutes);

//cors
app.use(cors());

socketHandler(io)

//assigning port to the server
httpServer.listen(3000, () => {
  console.log("Server is working!");
})

