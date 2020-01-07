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

        const foundUser = await User.findOne({ "local.email": email });

        // Hvis brukeren eksisterer fra før
        if(foundUser){ 
            return res.status(403).send({ error: "Email eksisterer fra før"})
        }

        const newUser = new User({
            method: "local",
            local: {
                email: email,
                password: password
            }
        });
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

    googleOAuth: async (req, res, next) => {
        console.log("req.user: ", req.user);
        const token = signToken(req.user);
        res.status(200).json({ token });
    },

    hemmelig: async (req, res, next) =>{
        console.log("Hemmelig del");
        console.log(req.user.program);
        res.json({ program: ["hey", "there"]});
    },

    program: async (req, res, next) =>{
        console.log(req.params);
        console.log(req.headers.jesus); // bare tester litt
        console.log(req.body);
        User.findByIdAndUpdate(req.user._id, {"program": ["test"]}, (error, oppdatertBruker)=>{
           
            if(error){
                console.log("error");
            } else {
                res.json( oppdatertBruker.program );
            }
        });
    }

}