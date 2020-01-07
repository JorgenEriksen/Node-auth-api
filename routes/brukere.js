const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConf = require("./passport");

const { validateBody, schemas } = require("../helpers/routeHelpers");
const BrukereController = require("../controllers/brukere");

router.route("/registrer")
    .post(validateBody(schemas.authSchema), BrukereController.registrer);


router.route("/loginn")
    .post(validateBody(schemas.authSchema), passport.authenticate("local", { session: false}), BrukereController.loginn);

router.route("/oauth/google")
    .post(passport.authenticate("googleToken", {session: false }), BrukereController.googleOAuth);

router.route("/hemmelig")
    .get(passport.authenticate("jwt", { session: false }), BrukereController.hemmelig);

router.route("/program")
    .put(passport.authenticate("jwt", { session: false }), BrukereController.program);

module.exports = router;