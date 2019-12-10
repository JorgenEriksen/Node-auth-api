const User = require("../models/user")

module.exports = {
    registrer: async (req, res, next) =>{

        // const { email, password } = req.value.body; kan skrive dette istedenfor de 2 linjene under
        const email = req.value.body.email;
        const password = req.value.body.password;

        const foundUser = await User.findOne({ email: email })

        // Hvis brukeren eksisterer fra før
        if(foundUser){ 
            return res.status(403).send({ error: "Email eksisterer fra før"})
        }

        const newUser = new User({
            email: email,
            password: password
        })
        await newUser.save();

        res.json({ user: "created" })
    },

    loginn: async (req, res, next) =>{
        console.log("BrukereController.loginn() er kjørt");
    },

    hemmelig: async (req, res, next) =>{
        console.log("BrukereController.hemmelig() er kjørt");
    }
}