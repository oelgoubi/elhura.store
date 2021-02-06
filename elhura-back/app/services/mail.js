var nodemailer = require('nodemailer');
require('dotenv').config()

module.exports = {
    smtpTransport: function() {
        return nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });
    },
    mailConfirmationOptions: function(verifyCode) {
        return {
            from : process.env.MAIL_NO_REPLY,
            to : 'mb.raharison@gmail.com',
            subject : "Please confirm your Email account",
            html : "Hello,<br> Your OTP password is : <br> <h3>"+verifyCode+"</h3>"
        }
    }
}