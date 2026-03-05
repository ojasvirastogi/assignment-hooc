import express from "express";
import {
  getDashboardSummary,
  getMonthlyRevenue,
  getStatusDistribution,
} from "../controllers/analytics.controller.js";
import adminOnly from "../middlewares/adminOnly.js";


const router = express.Router();

router.get("/summary", adminOnly, getDashboardSummary);
router.get("/monthly-revenue", adminOnly, getMonthlyRevenue);
router.get("/status-distribution", adminOnly, getStatusDistribution);
export default router;