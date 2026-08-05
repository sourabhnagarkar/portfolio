import { Router } from "express";
import rateLimit from "express-rate-limit";
import Contact from "../models/Contact.js";
import requireAdmin from "../middleware/auth.js";
import { sendContactEmail } from "../utils/mailer.js";

const router = Router();

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many messages sent. Please try again later." },
});

// POST /api/contact - public, store a message and email it to the site owner
router.post("/", contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are all required." });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    const contact = await Contact.create({ name, email, message });

    // Fire-and-forget: email delivery never blocks or fails the request,
    // the message is already safely stored in MongoDB either way.
    sendContactEmail({ name, email, message }).catch(() => {});

    res.status(201).json({ success: true, id: contact._id });
  } catch (err) {
    res.status(500).json({ error: "Could not send your message. Please try again." });
  }
});

// GET /api/contact - admin only, the inbox
router.get("/", requireAdmin, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch {
    res.status(500).json({ error: "Could not load messages." });
  }
});

// PATCH /api/contact/:id/read - admin only, toggle/set the read flag
router.patch("/:id/read", requireAdmin, async (req, res) => {
  try {
    const read = req.body.read !== undefined ? !!req.body.read : true;
    const message = await Contact.findByIdAndUpdate(req.params.id, { read }, { new: true });
    if (!message) return res.status(404).json({ error: "Message not found." });
    res.json(message);
  } catch {
    res.status(400).json({ error: "Could not update message." });
  }
});

// DELETE /api/contact/:id - admin only
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found." });
    res.json({ success: true });
  } catch {
    res.status(400).json({ error: "Could not delete message." });
  }
});

export default router;
