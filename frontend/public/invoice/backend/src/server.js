import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/db.js";
import { startCronJobs } from "./utils/cronJobs.js";


connectDB();
startCronJobs();

const PORT = process.env.PORT || 5000;

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);


app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});