const matchRouter = require('./match-router')
const tournamentRouter = require('./tournament-router')
const userRouter = require('./user-router')
const authRouter = require("./auth-router");
const seedRouter = require('./seed-router')


const router = require('express').Router();


router.use("/auth", authRouter);
router.use('/match',matchRouter)
router.use('/tournament',tournamentRouter)
router.use('/users',userRouter)
router.use('/seed',seedRouter)

module.exports = router;
