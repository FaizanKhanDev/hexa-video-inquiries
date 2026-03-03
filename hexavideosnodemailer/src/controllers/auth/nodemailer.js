import transporter from './../../config/emailConfig.js'; // Assuming correct path to email transporter

class NodemailerController {
  /* ================== Send Mail to Customer and Admin ================== */
  static sendMail = async (req, res) => {
    const { name, email, phone, subject, message } = req.body || {};

    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!phone) missingFields.push("phone");
    if (!subject) missingFields.push("subject");
    if (!message) missingFields.push("message");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: `The following fields are required: ${missingFields.join(", ")}`,
      });
    }

    try {
      // Send email to customer
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Vitality Health Care - Inquiry Received`,
        html: `
          <p>Dear ${name},</p>
          <p>Thank you for contacting Vitality Health Care. We have received your inquiry and will get back to you as soon as possible.</p>
          <p>Best regards,<br>Vitality Health Care Team</p>
        `,
      });

      // Send email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: 'faizan480khan@gmail.com', // Update with your admin's email address
        subject: `New Inquiry: ${subject}`,
        html: `
          <p>Dear Admin,</p>
          <p>You have received a new inquiry from ${name} (${email}).</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <p>Best regards,<br>Vitality Health Care Team</p>
        `,
      });

      // Send response to client
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Inquiry received. Confirmation emails sent to customer and admin.",
      });
    } catch (error) {
      console.error("Error sending emails:", error);
      return res.status(500).json({
        success: false,
        status: 500,
        message: "Failed to send emails. Please try again later.",
      });
    }
  }

  /* ================== Contact Company ================== */
  static contact = async (req, res) => {
    const { name, email, companyName, projectDetails } = req.body || {};

    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!companyName) missingFields.push("companyName");
    if (!projectDetails) missingFields.push("projectDetails");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: `The following fields are required: ${missingFields.join(", ")}`,
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid email format.",
      });
    }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: 'hexavideosleads@gmail.com',
        subject: `New Contact Request from ${name}`,
        html: `
          <h3>Contact Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company Name:</strong> ${companyName}</p>
          <p><strong>Project Details:</strong></p>
          <p>${projectDetails}</p>
        `,
      });

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Contact request sent successfully.",
      });
    } catch (error) {
      console.error("Error sending contact email:", error);
      return res.status(500).json({
        success: false,
        status: 500,
        message: "Failed to send contact email.",
      });
    }
  }

  /* ================== Download Blueprint ================== */
  static blueprint = async (req, res) => {
    const { email } = req.body || {};

    if (!email) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Email is required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid email format.",
      });
    }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: 'hexavideosleads@gmail.com',
        subject: `User wants to download blueprint - ${email}`,
        html: `
          <h3>Blueprint Download Request</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p>User wants to download blue print like something message</p>
        `,
      });

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Blueprint request sent successfully.",
      });
    } catch (error) {
      console.error("Error sending blueprint email:", error);
      return res.status(500).json({
        success: false,
        status: 500,
        message: "Failed to send blueprint request.",
      });
    }
  }

  /* ================== Stay Updated ================== */
  static stayUpdated = async (req, res) => {
    const { email } = req.body || {};

    if (!email) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Email is required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid email format.",
      });
    }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: 'hexavideosleads@gmail.com',
        subject: `New Subscriber - Stay Updated: ${email}`,
        html: `
          <h3>New Subscription Request</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p>This user wants to stay updated with our latest news and offers.</p>
        `,
      });

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Successfully subscribed for updates.",
      });
    } catch (error) {
      console.error("Error sending stay updated email:", error);
      return res.status(500).json({
        success: false,
        status: 500,
        message: "Failed to subscribe for updates.",
      });
    }
  }
}

export default NodemailerController;
