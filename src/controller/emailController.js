import nodemailer from "nodemailer";
import EmailMessageType from "../models/emailMessageModels.js";
import createEmailOptions from "../models/emailOptionsModels.js";
import dotenv from "dotenv";
dotenv.config();

const sendEmailController = async (req, res) => {
  const { to, cc, from, replyTo } = req.body;
  const subject = "Selamat Pagi";
  const message = "Selamat pagi, semoga hari Anda menyenangkan!";
  const messageType = EmailMessageType.TEXT;
  const emailOptions = createEmailOptions(
    to,
    subject,
    message,
    messageType,
    cc,
    from,
    replyTo
  );

  try {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;

    if (!smtpHost || !smtpPort) {
      throw new Error(
        "SMTP_HOST and SMTP_PORT must be defined in the environment variables"
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const formatMessage = (message, messageType) => {
      if (messageType === EmailMessageType.HTML) {
        return { html: message };
      }
      return {
        html: `<font face='Trebuchet MS' size='-1'>${message}</font>`,
        text: message,
      };
    };

    const formattedMessage = formatMessage(
      emailOptions.message,
      emailOptions.messageType
    );

    const mailOptions = {
      from: {
        name:
          emailOptions.from?.name ||
          process.env.MAIL_FROM_NAME ||
          "DX-DNIA Fajar",
        address:
          emailOptions.from?.address ||
          process.env.MAIL_FROM_ADDRESS ||
          "dx.dniaf@ap.denso.com",
      },
      to: Array.isArray(emailOptions.to)
        ? emailOptions.to.join(",")
        : emailOptions.to,
      cc: emailOptions.cc
        ? Array.isArray(emailOptions.cc)
          ? emailOptions.cc.join(",")
          : emailOptions.cc
        : undefined,
      subject: emailOptions.subject,
      ...formattedMessage,
      replyTo: emailOptions.replyTo,
    };

    const info = await transporter.sendMail(mailOptions);

    res.json({
      status: "success",
      message: "Email has been sent successfully",
      details: info,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to send email",
      error: err.message,
    });
  }
};

export default sendEmailController;
