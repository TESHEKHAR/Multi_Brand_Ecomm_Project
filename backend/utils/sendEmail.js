import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


// Create the transporter using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port : 587,
  secure : false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Main sendEmail function
const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"Your Company" <${process.env.EMAIL_USER}>`,
    to : to,
    subject,
    html,
  });
};

// Export as default for ESM
export default sendEmail;
