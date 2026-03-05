import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  quantity: Number,
  unitPrice: Number,
  discountPercent: Number,
  taxPercent: Number,
  lineSubtotal: Number,
  lineDiscount: Number,
  lineTax: Number,
  lineTotal: Number,
});

export default invoiceItemSchema;