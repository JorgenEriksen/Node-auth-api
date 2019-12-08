const router = require("express").Router();
const User = require("../model/user");

router.get("/", (req, res)=>{
    res.send("Test123");
});


router.post("/register", (req, res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email
    })
});


module.exports = router;