const { Request, Response } = require("express");
const db = require("../models");
const bcrypt = require("bcrypt");
const { SuccessObjectResponse } = require("../response-schemas/success-schema");
const { Op } = require("sequelize");
const { ErrorResponse } = require("../response-schemas/error-schema");
const { generateJWT } = require("../utils/jwt-utils");
const authController = {


  
  
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  register: async (req, res) => {
    const { pseudo, email, birthDate, gender} = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await db.Player.create({
      pseudo,
      email,
      password: hashedPassword,
      birthDate,
      gender
    });

    const token = await generateJWT({
      id: user.id,
      pseudo: user.pseudo,
      isAdmin: user.isAdmin,
      birthDate: user.birthDate,
      gender: user.gender
    })
    return res.json(new SuccessObjectResponse(token));
  },
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  login: async (req, res) => {
    const { identifier, password } = req.body;
    const user = await db.Player.findOne({
      where: {
        [Op.or]: [
          {
            pseudo: identifier,
          },
          {
            email: identifier,
          },
        ],
      },
    });

    if (!user) {
      return res.status(422).json(new ErrorResponse("Bad Credentials", 422));
    }

    const isPasswordSame = await bcrypt.compare(password, user.password);

    if (!isPasswordSame) {
      return res.status(422).json(new ErrorResponse("Bad Credentials", 422));
    }

    const token = await generateJWT({
      id: user.id,
      pseudo: user.pseudo,
      isAdmin: user.isAdmin
    })

    return res.json(new SuccessObjectResponse(token));
  },
};

module.exports = authController;
