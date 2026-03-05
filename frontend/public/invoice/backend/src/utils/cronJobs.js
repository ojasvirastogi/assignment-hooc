import cron from "node-cron";
import Invoice from "../models/invoice.model.js";
import { sendEmail } from "./sendEmail.js";

export const startCronJobs = () => {
  // Runs daily at 12 AM
  cron.schedule("0 0 * * *", async () => {
    console.log("Running overdue invoice scan...");

    const today = new Date();

    const overdueInvoices = await Invoice.find({
      dueDate: { $lt: today },
      status: { $ne: "Paid" },
    });

    for (let invoice of overdueInvoices) {
      invoice.status = "Overdue";
      await invoice.save();

      await sendEmail(
        invoice.email,
        `Invoice ${invoice.invoiceNumber} is Overdue`,
        `<h2>Payment Overdue</h2>
         <p>Your invoice is overdue.</p>
         <p>Total Due: ₹${invoice.total}</p>`
      );
    }
  });
};