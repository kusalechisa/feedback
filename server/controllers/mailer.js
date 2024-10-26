import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import ENV from "../config.js";

let nodeConfig = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS
  auth: {
    user: ENV.EMAIL,
    pass: ENV.PASSWORD,
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Feedback and Anti-Corruption Administrators",
    link: "https://kusalechisa.netlify.app",
  },
});

export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // Create the email body using Mailgen
  var email = {
    body: {
      name: username,
      intro:
        text ||
        `Dear ${username},\n\nThank you for signing up for our feedback system. We're excited to have you on board!`,
      outro: "\n\nBest regards,\nThe Feedback and Anti-Corruption System Admin",
    },
  };

  // Generate the HTML email body
  var emailBody = MailGenerator.generate(email);

  let message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: subject || "You Signed Up Successfully",
    html: emailBody,
  };

  // Send the email
  try {
    await transporter.sendMail(message);
    return res
      .status(200)
      .send({ msg: "You should receive an email from us." });
  } catch (error) {
    console.error("Email sending error:", error); // Log the error for troubleshooting
    return res.status(500).send({
      error: "There was an error sending the email. Please try again later.",
    });
  }
};
