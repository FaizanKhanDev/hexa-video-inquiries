import express from 'express';
const router = express.Router();
import NodemailerController from '../controllers/auth/nodemailer.js';
import rateLimit from 'express-rate-limit';

// Rate limiter configuration: maximum 10 requests per minute
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
  message: {
    success: false,
    status: 429,
    message: "Too many requests from this IP, please try again after a 15 minutes."
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// router.post('/sendMail', NodemailerController.sendMail);
router.post('/contact', apiLimiter, NodemailerController.contact);
router.post('/blueprint', apiLimiter, NodemailerController.blueprint);
router.post('/stay-updated', apiLimiter, NodemailerController.stayUpdated);

export default router;