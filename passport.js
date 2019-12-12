require("dotenv").config({
    path: __dirname + "/.env"
})
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const {
    ExtractJwt
} = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");

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

// local stategy
passport.use(new LocalStrategy({
    usernameField: "email"
}, async (email, password, done) => {
    try {
        const user = await User.findOne({
            email: email
        });

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