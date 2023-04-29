import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Parse incoming request data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-AUTH-TOKEN");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE,OPTIONS");

    next();
});

app.post('/contact-form-handler', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    // Create a nodemailer transporter object
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    // Define the email options
    const mailOptions = {
        from: email,
        to: 'abhinabroy2001@gmail.com',
        subject: 'New message from your portfolio website',
        text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    });
});

export default app;
