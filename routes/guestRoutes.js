import express from "express";
import { guestRoutes } from "./routesConfig.js";
import { setupRoutes } from "./routeHandler.js";

const router = express.Router();
setupRoutes(router, guestRoutes);
export default router;