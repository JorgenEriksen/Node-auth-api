require("dotenv").config({path: __dirname + "/.env"})
const JWT = require("jsonwebtoken");
const User = require("../models/user");


function signToken(user) {
    return JWT.sign({
        iss: "Treningsapp",
        sub: user._id,
        iat: new Date().getTime(), //  dagens dato
        exp: new Date().setDate(new Date().getDate() + 1) // dagens dato + 1 dag
    }, process.env.SECRET_TOKEN_TEXT);
}

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

        // genererer token
        const token = signToken(newUser);

        // responderer med token
        res.status(200).json({ token: token});
    },

    loginn: async (req, res, next) =>{

    
        const token = signToken(req.user);
        res.status(200).json({ token });

        
    },

    hemmelig: async (req, res, next) =>{
        console.log("Hemmelig del");
        res.json({ program: ["hey", "there"]});
    }
}