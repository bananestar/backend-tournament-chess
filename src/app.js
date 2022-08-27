require('dotenv').config();
require('express-async-errors');

const { seedUser, seedTournament, seedMatch, seedDB } = require('./utils/seed-utils');
const express = require('express');
const cors = require('cors');

const app = express();
const { PORT, URL } = process.env;

const db = require('./models');

db.sequelize
	.authenticate()
	.then(() => console.log('Connection DB => ok'))
	.catch((errors) => console.log('Connection DB => NOT OK!!', errors));
// db.sequelize.sync({ alter: true, force: true });
// db.sequelize.sync();

app.use(cors());
app.use(express.json());

const router = require('./routes');

app.use('/api', router);

app.listen(PORT, () => {
	console.warn(`Listening => ${URL}${PORT}`);
});

// seedUser(1000)
// seedTournament(50)
// seedMatch(1)
// seedDB(10)

// const {SendNewUser} = require('./mails/sendEmail');
// SendNewUser('s.vanderlinden13@gmail.com','Bananestar')
