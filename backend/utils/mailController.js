const nodemailer = require("nodemailer");

const sendMail = async ({ receiver, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "df709f00b1cfab",
        pass: "fb6cdbf6a05364",
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: receiver,
      subject: subject,
      text: text,
      html: html,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendMail;
