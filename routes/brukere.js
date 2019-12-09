const express = require("express");
const router = require("express-promise-router")();

const BrukereController = require("../controllers/brukere");

router.route("/registrer")
    .post(BrukereController.registrer);


router.route("/loginn")
    .post(BrukereController.loginn);


router.route("/hemmelig")
    .get(BrukereController.hemmelig);


module.exports = router;