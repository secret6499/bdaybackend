const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);
app.post('/send-mail', async (req, res) => {
  const to = process.env.RECEIVER; 
  const subject = 'clicked the FOR YOU button';
  const message = 'Clicked the first button...';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
   console.log('Email sent successfully');
  } catch (err) {
    console.log('Error sending email:', err);
  }
});
app.post('/send-mail2', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send('Message content is required.');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,     
      pass: process.env.SMTP_PASS       
    }
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.RECEIVER,    
    subject: 'Birthday Reply 🎉',
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Reply sent!');
  } catch (err) {
    console.error('Error sending reply email:', err);
    res.status(500).send('Error sending reply email');
  }
});
app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
