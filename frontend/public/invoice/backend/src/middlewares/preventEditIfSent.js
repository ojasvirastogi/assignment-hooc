import Invoice from "../models/invoice.model.js";

const preventEditIfSent = async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id);

  if (!invoice) {
    return res.status(404).json({ message: "Invoice not found" });
  }

  if (invoice.status === "Sent" || invoice.status === "Paid") {
    return res.status(400).json({
      message: "Invoice cannot be modified after sending",
    });
  }

  next();
};

export default preventEditIfSent;