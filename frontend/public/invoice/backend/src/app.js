import express from "express";
import cors from "cors";
import morgan from "morgan";
import invoiceRoutes from "./routes/invoice.routes.js";
import publicRoutes from "./routes/public.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import rateLimit from "express-rate-limit";
// import paymentRoutes from "./routes/payment.routes.js";



const app = express();

// 1. Configure CORS First (So preflight requests don't fail)
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true
}));

// 2. Body parsers and loggers
app.use(express.json());
app.use(morgan("dev"));

// 3. Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);


app.use("/api/invoice", invoiceRoutes);
app.use("/", publicRoutes);
app.use("/api/analytics", analyticsRoutes);
// app.use("/api/payment", paymentRoutes);





app.get("/", (req, res) => {
  res.json({ message: "Invoice System Running 🚀" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

export default app;