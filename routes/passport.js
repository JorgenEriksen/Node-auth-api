require("dotenv").config({
    path: __dirname + "/.env"
})
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const {
    ExtractJwt
} = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// JSON web token strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: process.env.SECRET_TOKEN_TEXT
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub)

        // hvis brukeren ikke eksisterer
        if (!user) {
            return done(null, false);
        }

        // returnerer brukeren
        done(null, user);

    } catch (error) {
        done(error, false);
    }

}));

// google oauth strategy
passport.use("googleToken", new GooglePlusTokenStrategy({
clientID: process.env.GOOGLE_CLIENT_ID,
clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, async(accessToken, refreshToken, profile, done)=>{
    try{
        console.log("accessToken: ", accessToken );
        console.log("refreshToken: ", refreshToken);
        console.log("profile: ", profile);
    
        // sjekker om brukeren existerer i databasen
        const existingUser = await User.findOne({ "google.id": profile.id});
        if(existingUser){
            console.log("brukeren eksisterer allerede i databasen");
            return done(null, existingUser);
        }
    
        console.log("Lager ny bruker til databasen");

        const newUser = new User({
            method: "google",
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });
    
        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }




}));

// local stategy
passport.use(new LocalStrategy({
    usernameField: "email"
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ "local.email": email });

        // hvis bruker ikke eksisterer
        if (!user) {
            return done(null, false);
        }

        const isMatch = await user.isValidPassword(password);

        if (!isMatch) {
            return done(null, false);
        }

        // returnerer brukeren
        done(null, user);

    } catch (error) {
        done(error, false);
    }

}));