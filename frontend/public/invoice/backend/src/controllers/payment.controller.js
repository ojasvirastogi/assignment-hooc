// import razorpay from "../config/razorpay.js";
// import Invoice from "../models/invoice.model.js";
// import Payment from "../models/payment.model.js";
// import crypto from "crypto";

// export const createPaymentOrder = async (req, res) => {
//   try {
//     const { invoiceId } = req.body;

//     const invoice = await Invoice.findById(invoiceId);

//     if (!invoice) {
//       return res.status(404).json({ message: "Invoice not found" });
//     }

//     const options = {
//       amount: invoice.total * 100, // paise
//       currency: "INR",
//       receipt: `receipt_${invoice._id}`,
//     };

//     const order = await razorpay.orders.create(options);

//     await Payment.create({
//       invoiceId: invoice._id,
//       razorpayOrderId: order.id,
//       amount: invoice.total,
//       currency: "INR",
//     });

//     res.json({
//       success: true,
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ message: "Invalid signature" });
//     }

//     const payment = await Payment.findOne({
//       razorpayOrderId: razorpay_order_id,
//     });

//     payment.status = "Success";
//     payment.razorpayPaymentId = razorpay_payment_id;
//     payment.razorpaySignature = razorpay_signature;
//     await payment.save();

//     const invoice = await Invoice.findById(payment.invoiceId);
//     invoice.status = "Paid";
//     await invoice.save();

//     res.json({
//       success: true,
//       message: "Payment verified & invoice marked as Paid",
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// export const razorpayWebhook = async (req, res) => {
//   const secret = process.env.RAZORPAY_KEY_SECRET;

//   const expectedSignature = crypto
//     .createHmac("sha256", secret)
//     .update(JSON.stringify(req.body))
//     .digest("hex");

//   const receivedSignature = req.headers["x-razorpay-signature"];

//   if (expectedSignature === receivedSignature) {
//     console.log("Webhook verified");

//     // handle event
//     if (req.body.event === "payment.captured") {
//       const paymentEntity = req.body.payload.payment.entity;

//       const payment = await Payment.findOne({
//         razorpayOrderId: paymentEntity.order_id,
//       });

//       if (payment) {
//         payment.status = "Success";
//         payment.razorpayPaymentId = paymentEntity.id;
//         await payment.save();

//         const invoice = await Invoice.findById(payment.invoiceId);
//         invoice.status = "Paid";
//         await invoice.save();
//       }
//     }

//     res.status(200).json({ status: "ok" });
//   } else {
//     res.status(400).json({ message: "Invalid webhook signature" });
//   }
// };