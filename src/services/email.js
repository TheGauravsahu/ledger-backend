import nodemailer from "nodemailer";
import env from "../config/env.js";
import { logger } from "../config/logger.js";
import { LedgerError } from "../utils/ledgerError.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: env.GMAIL_USER,
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    refreshToken: env.REFRESH_TOKEN,
  },
});

transporter.verify((error, success) => {
  if (error) {
    logger.error("Error connecting to email server:", error);
  } else {
    logger.info("Email server is ready to send messages");
  }
});

export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${env.GMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    logger.info("Message sent: %s", info.messageId);
    logger.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (e) {
    logger.error("Error sending email: ", e);
    throw new LedgerError(e.message);
  }
};

export const sendWelcomeEmail = async (to, name) => {
  const subject = "Welcome to Backend Ledger!";
  const text = `Hi ${name},\n\nWelcome to Backend Ledger! We're excited to have you on board. If you have any questions or need assistance, feel free to reach out.\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hi ${name},</p><p>Welcome to Backend Ledger! We're excited to have you on board. If you have any questions or need assistance, feel free to reach out.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

  await sendEmail(to, subject, text, html);
};
