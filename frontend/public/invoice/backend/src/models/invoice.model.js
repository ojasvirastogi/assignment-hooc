import mongoose from "mongoose";
import invoiceItemSchema from "./invoiceItem.model.js";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      unique: true,
    },

    clientName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    
    clientPhone: String,
    companyName: String,
    gstNumber: String,
    clientAddress: String, /* To store billingAddress */
    country: String,

    items: [invoiceItemSchema],  // 👈 Embedded Items

    subtotal: Number,
    discount: Number,
    tax: Number,
    total: Number,

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      default: "Draft",
    },

    dueDate: Date,
    paymentTerms: String,
    notes: String,
    terms: String,
    
    viewedAt: Date,
    accessTokenHash: String,
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);