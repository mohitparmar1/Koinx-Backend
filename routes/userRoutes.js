import express from "express";
import { getStats } from "../controllers/cryptoController.js";

const router = express.Router();

router.get("/stats", getStats);

export default router;
