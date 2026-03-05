import express from "express";
import {
  createInvoice,
  downloadInvoicePDF,
  sendInvoiceEmail,
  getAllInvoices
} from "../controllers/invoice.controller.js";
import { validateInvoice, handleValidation } from "../middlewares/validation.middleware.js";

const router = express.Router();

router.get("/", getAllInvoices);

router.post(
  "/create",
  validateInvoice,
  handleValidation,
  createInvoice
);

router.get("/download/:id", downloadInvoicePDF);
router.post("/send-email/:id", sendInvoiceEmail);


export default router;