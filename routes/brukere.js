const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConf = require("../passport");

const { validateBody, schemas } = require("../helpers/routeHelpers");
const BrukereController = require("../controllers/brukere");

router.route("/registrer")
    .post(validateBody(schemas.authSchema), BrukereController.registrer);


router.route("/loginn")
    .post(BrukereController.loginn);


router.route("/hemmelig")
    .get(passport.authenticate("jwt", { session: false }), BrukereController.hemmelig);


module.exports = router;