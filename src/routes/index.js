
const authRouter = require("./auth-router");


const router = require('express').Router();


router.use("/auth", authRouter);


module.exports = router;
