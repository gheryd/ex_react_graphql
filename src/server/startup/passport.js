const passport = require("passport");
import AuthStore from "../models/auth_store";
const LocalStrategy = require('passport-local').Strategy;
const Auth = require("../models/auth");
const expressSession = require('express-session');
const auth = new Auth();
module.exports = (app) => {
    
    passport.serializeUser((user, done)=>{
        console.log("[passport.serializeUser] user:", user);
        done(null, user.id);
    })

    passport.deserializeUser((id, done)=>{
        console.log( "[passport.deserializeUser] get user for id:",id );
        auth.get(id).then(user=>{
            console.log("[passport.deserializeUser] user:", user);
            done(null,user)
        }).catch(err=>{
            console.log("[passport.deserializeUser] error:", err);
            return done(err);
        });
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

    
    app.use(expressSession({
        resave: true,
        saveUninitialized: false,
        secret: '23571113',
        store: new AuthStore()
    }));
    app.use(passport.initialize());
    app.use(passport.session());
}