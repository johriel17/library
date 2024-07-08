import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


export const sendEmailNotification = (to, subject, text) => {
  const mailOptions = {
    from: '"Library Notification" <chiyungzxc17@gmail.com>', 
    to: to, 
    subject: subject, 
    text: text, 

  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};