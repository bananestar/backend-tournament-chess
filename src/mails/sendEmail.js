require('dotenv').config();

const nodemailer = require('nodemailer');
const { EMAIL_SERVICE, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_SENDER } = process.env;

const transporter = nodemailer.createTransport({
	host: EMAIL_SERVICE,
	secureConnection: false,
	port: EMAIL_PORT,
	tls: {
		rejectUnauthorized: false,
	},
	auth: {
		user: EMAIL_USERNAME,
		pass: EMAIL_PASSWORD,
	},
});

const SendNewUser = (email, userName) => {
	const mailOptions = {
		from: EMAIL_SENDER,
		to: email,
		subject: 'New Account',
		html: `<h1>Welcome ${userName}!</h1><br>Your account has just been created!`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		return console.log('Message sent: ' + info.response);
	});
};

const SendResetPassword = (email) => {
	const mailOptions = {
		from: EMAIL_SENDER,
		to: email,
		subject: 'Reset Password',
		html: `<h1>Reset</h1><br><a href="https://example.com">Reset</a>`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		return console.log('Message sent: ' + info.response);
	});
};

const SendUpdatePassword = (email) => {
	const mailOptions = {
		from: EMAIL_SENDER,
		to: email,
		subject: 'New Password',
		html: `<h1>your password has been updated with success</h1>`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		return console.log('Message sent: ' + info.response);
	});
};

module.exports = { SendNewUser, SendResetPassword, SendUpdatePassword };
