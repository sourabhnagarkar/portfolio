import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null; // not configured - contact form still saves to DB either way
  }
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: Number(process.env.SMTP_PORT) === 465 || !process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

// Sends a notification email for a new contact-form message.
// Never throws - logs and resolves false so the API response never
// fails just because email delivery had a problem.
export async function sendContactEmail({ name, email, message }) {
  const t = getTransporter();
  if (!t) {
    console.warn("Email not sent: SMTP is not configured in .env");
    return false;
  }

  const to = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER;

  try {
    await t.sendMail({
      from: `"Portfolio contact form" <${process.env.SMTP_USER}>`,
      to,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height:1.6;">
          <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });
    return true;
  } catch (err) {
    console.error("Failed to send contact email:", err.message);
    return false;
  }
}

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
