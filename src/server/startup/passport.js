const passport = require("passport");
import AuthStore from "../models/auth_store";
const LocalStrategy = require('passport-local').Strategy;
const Auth = require("../models/auth");
const expressSession = require('express-session');
const auth = new Auth();
module.exports = (app) => {
    
    passport.serializeUser((user, done)=>{
        console.log("serialize user:", user);
        done(null, user.id);
    })

    passport.deserializeUser((id, done)=>{
        console.log( "deserialize user id:",id );
        auth.get(id).then(user=>done(null,user));
    });

    passport.use(new LocalStrategy(
        {usernameField: 'nickname'},
        (nickname, password, done)=>{
            auth.getByNicknameAndPassword(nickname, password).then(
                (user) => {
                    if(!user){
                        return done(null, false, 'auth failed');
                    }
                    return done(null, user);
                }
            ).catch((err)=>{
                return done(err);
            });
        }
    ));

    app.use((req, res, next) => {
        console.log("req "+req.method+"  " + req.url);
        next();
    });
    app.use(expressSession({
        resave: true,
        saveUninitialized: true,
        secret: '23571113',
        store: new AuthStore()
    }));
    app.use(passport.initialize());
    app.use(passport.session());
}