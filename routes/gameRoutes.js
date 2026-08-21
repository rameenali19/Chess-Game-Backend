import express from "express";
import { gameRoutes } from "./routesConfig.js";
import { setupRoutes } from "./routeHandler.js";

const router = express.Router();
setupRoutes(router, gameRoutes);
export default router;