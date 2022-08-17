const playerRouter = require('./playerRouter');
const authRouter = require("./auth-router");
const tournamentRouter = require('./tournamentRouter');

const router = require('express').Router();

router.use('/players', playerRouter);
router.use("/auth", authRouter);
router.use('/tournaments',tournamentRouter)

module.exports = router;
