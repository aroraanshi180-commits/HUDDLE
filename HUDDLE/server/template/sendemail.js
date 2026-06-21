const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,

      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"CRM Task Manager" <${process.env.SMTP_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      html: options.message,
    };

    const info = await transporter.sendMail(
      mailOptions
    );

    console.log("================================");
    console.log("EMAIL SENT SUCCESSFULLY");
    console.log("To:", options.email);
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
    console.log("================================");

    return info;

  } catch (error) {
    console.error("================================");
    console.error("EMAIL ERROR");
    console.error(error);
    console.error("================================");

    throw error;
  }
};

module.exports = sendEmail;