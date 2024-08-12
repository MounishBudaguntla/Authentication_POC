const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service : "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_HOST_USER,
      pass: process.env.EMAIL_HOST_PASSWORD,
    },
});

const sendWelcomeEmail = (to) => {
    const mailOptions = {
        from: {
            name: 'Authentication_Poc',
            address: process.env.EMAIL_HOST_USER,
        },
        to: to,
        subject: 'Welcome to Authentication POC',
        text: 'Hello, welcome to our application!',
        html: '<b>Hello, welcome to our application!</b>',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
};

const sendProductUpdateEmail = (to, productName) => {
    const mailOptions = {
        from: {
            name: 'Authentication_Poc',
            address: process.env.EMAIL_HOST_USER,
        },
        to: to,
        subject: `Update on Product: ${productName}`,
        text: `Dear Customer, The product "${productName}" in your cart has been updated. Please review the changes in your cart.`,
        html: `<b>Dear Customer,</b><br>The product "<b>${productName}</b>" in your cart has been updated. Please review the changes in your cart.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
};


module.exports = {
    sendWelcomeEmail,
    sendProductUpdateEmail,
};