const {checkScalarResult, createAxiosInstance} = require("../utils/model_utils");
const passport = require("passport");
const axios = createAxiosInstance();

class Auth {

    async get(id){
        return axios.get(`/users/${id}`).then(checkScalarResult) 
    }

    async getByNickname(nickname){
        return axios.get(`/users`, {params:{nickname}}).then(checkScalarResult)
    }

    async getByNicknameAndPassword(nickname, password){
        return axios.get(`/users`, {params:{nickname, password}}).then(checkScalarResult)
    }

    async signup(nickname, password, req){
        console.log("[auth.signup] search by nickname:", nickname);
        let user = await this.getByNickname(nickname);
        
        if(user){
            console.log("[auth.signup] already exists, throw error");
            throw new Error("nickname alredy exists");
        }

        console.log("[auth.signup] create user ...", nickname);
        user = await axios.post(`/users`, {nickname, password}).then((res)=>{
            return res.data
        })
        return new Promise((resolve, reject)=>{
            req.logIn(user, (err)=>{
                console.log("[auth.signup] promise req.logIn, argument err:", err);
                if(err) reject(err);
                resolve(user);
            });
        });
        
    }

    async login(nickname, password, req){
        console.log("[auth.login] return promise...");
        return new Promise((resolve, reject) => {
            passport.authenticate('local', (err, user) => {
                console.log("[auth.login] passport.authenticate...");
                if (!user) {
                    console.log("[auth.login] user not found");
                    return reject("auth failed");
                }
                req.login(user, () => {
                    console.log("[auth.login] resolve login user:", user);
                    resolve(user)
                });
            })({ body: { nickname, password } });
        })
    }

}

module.exports = Auth;