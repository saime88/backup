

const mongoose = require("mongoose")
const User = require("../model/user")

const keys = require('./keys')
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports=passport=>{
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    //console.log(jwt_payload)
    User.findById(jwt_payload.id).then(user=>{
        if(user){
            return done(null,user)
        }
        return done(null,false)
    }).catch(error=>{
        console.log(error)
    })
    }));
}