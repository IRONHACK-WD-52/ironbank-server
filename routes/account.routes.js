const express = require("express");
const router = express.Router();

const AccountModel = require("../models/Account.model");

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

// Criar uma nova conta
router.post(
  "/account",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { type } = req.body;
      const loggedInUser = req.currentUser;

      const lastInsertedAccount = await AccountModel.findOne(
        {},
        { accountNumber: 1, _id: 0 },
        { sort: { accountNumber: -1 }, limit: 1 }
      );

      // Como o numero da conta é sequencial, vamos adicionar um ao ultimo numero de conta inserido. Caso ainda não exista nenhuma conta, fixamos o valor em 1
      const accountNumber = lastInsertedAccount
        ? lastInsertedAccount.accountNumber + 1
        : 1;

      const newAccount = await AccountModel.create({
        userId: loggedInUser._id,
        accountNumber: accountNumber,
        type: type,
      });

      return res.status(201).json(newAccount);
    } catch (err) {
      next(err);
    }
  }
);

// Visualizar uma conta específica
router.get("/account/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;

    const account = await AccountModel.findOne({ _id: id });

    return res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});

// Visualizar todas as contas do usuário
router.get(
  "/account",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const loggedInUser = req.currentUser;

      // Trazendo todas as contas do usuário logado
      const accounts = await AccountModel.find({ userId: loggedInUser._id });

      if (!accounts) {
        return res
          .status(404)
          .json({ error: "Você ainda não cadastrou nenhuma conta" });
      }

      return res.status(200).json(accounts);
    } catch (err) {
      next(err);
    }
  }
);

// Criar novo cartão
router.put(
  "/account/:id/create-card",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {

      const {id} = req.params;
      const {pin} = req.body;

      // Gerando um numero de cartão aleatório sempre com 16 caracteres
      const generatedCardNumber = String(Math.floor(1000000000000000 + Math.random() * 9999999999999999)).slice(-16);

      // Dada a data de hoje, some 5 anos e extraia somente o mês e o ano
      const generatedValidThru;

      // Gerando um codigo de segurança aleatório sempre com 3 caracteres
      const generatedSecurityCode = String(Math.floor(100 + Math.random() * 999)).slice(-3);

    } catch (err) {
      next(err)
    }
  }
);

module.exports = router;
