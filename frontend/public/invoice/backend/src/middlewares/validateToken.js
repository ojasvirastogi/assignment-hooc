import Invoice from "../models/invoice.model.js";
import crypto from "crypto";

const validateToken = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { token } = req.query;

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    if (invoice.accessTokenHash !== hashedToken) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.invoice = invoice;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default validateToken;