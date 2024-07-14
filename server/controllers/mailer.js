import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import ENV from "../config.js";

let nodeConfig = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: ENV.EMAIL,
    pass: ENV.PASSWORD,
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Complaint and Anti-Corruption Adminstartors",
    link: "https://mint.gov.et/?lang=en",
  },
});

export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // Create the body of the email using Mailgen
  var email = {
    body: {
      name: username,
      intro:
        text ||
        `Dear ${username},\n\nThank you for signing up for our feedback system Admin. We're excited to have you on board!`,
      outro: "\n\nBest regards,\nThe Complaint and Anticorruption System Admin",
    },
  };

  // Generate the HTML email body using Mailgen
  var emailBody = MailGenerator.generate(email);

  let message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: subject || "You Signedup Successfully",
    html: emailBody,
  };

  // Send the email
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "You should receive an email from us." });
    })
    .catch((error) => res.status(500).send({ error }));
};
