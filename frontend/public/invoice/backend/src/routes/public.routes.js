import express from "express";
import validateToken from "../middlewares/validateToken.js";
import { getPublicInvoice } from "../controllers/invoice.controller.js";

const router = express.Router();

router.get("/invoice/:id", validateToken, getPublicInvoice);

export default router;