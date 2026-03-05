import { body, validationResult } from "express-validator";

export const validateInvoice = [
  body("clientName").notEmpty().withMessage("Client name required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("items").isArray({ min: 1 }).withMessage("At least one item required"),
];

export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};