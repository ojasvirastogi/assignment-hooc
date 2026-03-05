import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },

    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,

    amount: Number,
    currency: String,

    status: {
      type: String,
      enum: ["Initiated", "Success", "Failed"],
      default: "Initiated",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);