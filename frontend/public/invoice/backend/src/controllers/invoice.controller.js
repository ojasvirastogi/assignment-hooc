import Invoice from "../models/invoice.model.js";
import Counter from "../models/counter.model.js";
import crypto from "crypto";
import { calculateInvoice } from "../utils/calculateInvoice.js";
import { generateInvoicePDF } from "../utils/generateInvoicePDF.js";
import { sendEmail } from "../utils/sendEmail.js";

export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, invoices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const { 
      clientName, email, items, dueDate,
      clientPhone, companyName, gstNumber, billingAddress, country,
      paymentTerms, notes, terms
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items required" });
    }

    const year = new Date().getFullYear();

    let counter = await Counter.findOne({ year });

    if (!counter) {
      counter = await Counter.create({ year, sequence: 1 });
    } else {
      counter.sequence += 1;
      await counter.save();
    }

    const sequenceFormatted = String(counter.sequence).padStart(6, "0");

    const invoiceNumber =
      `${process.env.COMPANY_PREFIX}-${year}-${sequenceFormatted}`;

    // Calculate totals securely
    const {
      calculatedItems,
      subtotal,
      totalDiscount,
      totalTax,
      total,
    } = calculateInvoice(items);

    // Secure token
const rawToken = crypto.randomBytes(32).toString("hex");

const hashedToken = crypto
  .createHash("sha256")
  .update(rawToken)
  .digest("hex");



    const invoice = await Invoice.create({
      invoiceNumber,
      clientName,
      email,
      clientPhone,
      companyName,
      gstNumber,
      clientAddress: billingAddress,
      country,
      paymentTerms,
      notes,
      terms,
      items: calculatedItems,
      subtotal,
      discount: totalDiscount,
      tax: totalTax,
      total,
      dueDate,
      accessTokenHash: hashedToken
    });

    // Automatically generate and send the PDF email
    try {
      const pdf = await generateInvoicePDF(invoice);

      await sendEmail(
        invoice.email, // using 'email' field because schema stores it as 'email'
        `Invoice ${invoice.invoiceNumber}`,
        `<h2>Your Invoice</h2>
         <p>Please find your newly generated invoice attached.</p>
         <p>Total: ₹${invoice.total}</p>`,
        [
          {
            filename: `${invoice.invoiceNumber}.pdf`,
            content: pdf,
          },
        ]
      );
      
      invoice.status = "Sent";
      await invoice.save();
    } catch (emailErr) {
      console.error("Auto-Send Email Error during creation:", emailErr);
      // We don't want to throw an error out of createInvoice just because email failed
    }

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

    res.status(201).json({
      success: true,
      invoiceNumber,
      publicUrl: `${frontendUrl}/invoice/${invoice._id}?token=${rawToken}`,      
      invoice,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getPublicInvoice = async (req, res) => {
  try {
    const invoice = req.invoice;

    // If invoice not viewed yet → mark viewed
    if (invoice.status === "Draft" || invoice.status === "Sent") {
      invoice.status = "Viewed";
      invoice.viewedAt = new Date();
      await invoice.save();
    }

    res.status(200).json({
      success: true,
      invoice,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const downloadInvoicePDF = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const pdf = await generateInvoicePDF(invoice);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${invoice.invoiceNumber}.pdf`,
    });

    res.send(pdf);
  } catch (error) {
    console.error("PDF DOWNLOAD ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};



export const sendInvoiceEmail = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const pdf = await generateInvoicePDF(invoice);

    await sendEmail(
      invoice.email,
      `Invoice ${invoice.invoiceNumber}`,
      `<h2>Your Invoice</h2>
       <p>Please find attached invoice.</p>
       <p>Total: ₹${invoice.total}</p>`,
      [
        {
          filename: `${invoice.invoiceNumber}.pdf`,
          content: pdf,
        },
      ]
    );

    invoice.status = "Sent";
    await invoice.save();

    res.json({ success: true, message: "Invoice sent successfully" });
  } catch (error) {
    console.error("SEND ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};