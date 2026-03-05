import nodemailer from "nodemailer";

let transporter;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
};

export const sendEmail = async (to, subject, html, attachments = []) => {
  try {
    const currentTransporter = getTransporter();
    await currentTransporter.verify();
    console.log("SMTP Ready");

    const info = await currentTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
      attachments,
    });

    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};