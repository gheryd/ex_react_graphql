const axios = require("axios");
const checkScalarResult = require("../utils/checkScalarResult");
const passport = require("passport");


class Auth {

    async getAll(){
        return axios.get(`http://localhost:3001/users`).then(checkScalarResult)
    }

    async get(id){
        return axios.get(`http://localhost:3001/users/${id}`).then(checkScalarResult) 
    }

    async getByNickname(nickname){
        return axios.get(`http://localhost:3001/users`, {params:{nickname}}).then(checkScalarResult)
    }

    async getByNicknameAndPassword(nickname, password){
        return axios.get(`http://localhost:3001/users`, {params:{nickname, password}}).then(checkScalarResult)
    }

    async signup(nickname, password, req){
        let user = await this.getByNickname(nickname);
        
        if(user){
            throw new Error("nickname alredy exists");
        }
        user = await axios.post(`http://localhost:3001/users`, {nickname, password}).then((res)=>{
            return res.data
        })
        return new Promise((resolve, reject)=>{
            req.logIn(user, (err)=>{
                if(err) reject(err);
                resolve(user);
            });
        });
        
    }

    async login(nickname, password, req){
        /*
        let user =  await axios.get(`http://localhost:3001/users`, {params: {nickname, password}}).then((res)=>{
            return res.data
        })
        console.log("login -->", user);
        if(!user){
            throw new Error("auth failed");
        }
        */
        return new Promise((resolve, reject) => {
            passport.authenticate('local', (err, user) => {
                if (!user) {
                    return reject("auth failed");
                }
                req.login(user, () => {
                    console.log("resolve login user:", user);
                    resolve(user)
                });
            })({ body: { nickname, password } });
        })
    }

    async logout(){

    }
}
module.exports = Auth;
