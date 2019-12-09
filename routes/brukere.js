const express = require("express");
const router = require("express-promise-router")();

const { validateBody, schemas } = require("../helpers/routeHelpers");
const BrukereController = require("../controllers/brukere");

router.route("/registrer")
    .post(validateBody(schemas.authSchema), BrukereController.registrer);


router.route("/loginn")
    .post(BrukereController.loginn);


router.route("/hemmelig")
    .get(BrukereController.hemmelig);


module.exports = router;