const axios = require("axios");
const checkScalarResult = require("../utils/checkScalarResult");
//const EventEmiter = require('events');
const Store = require("express-session/session/store")

class MyStore extends Store{

    destroy(sid, callback) {
        console.log("destroy session...",sid);
        axios.delete(`http://localhost:3001/sessions/${sid}`, {sid})
            .then(checkScalarResult)
            .then((session)=> {
                callback(null);
            }).catch(err=>{
                callback(err);
            });
    }
    get(sid, callback){
        console.log("get session... ", sid);
        axios.get(`http://localhost:3001/sessions/${sid}`).then(checkScalarResult).then(
            (session)=>{
                console.log("callback", session);
                callback(null, session);
            }
        ).catch(err=>{
            if(err && err.response && err.response.status===404){
                return callback(null, null);
            }
            console.log("error in get session")
            callback(err);
        });;
    }
    set(sid, session, callback){
        console.log("set session...", sid);
        var data = {...session, id:sid};
        axios.get(`http://localhost:3001/sessions/${sid}`).then(checkScalarResult).then(
            (existingSession)=>{
                console.log("update session:", sid);
                axios.put(`http://localhost:3001/sessions/${sid}`, session).then(
                    (r) => callback(null)
                );
                
            }
        ).catch((err)=>{
            if(err.response.status==404){
                console.log("create session:", sid);
                return axios.post(`http://localhost:3001/sessions/`,data )
                .then(checkScalarResult)
                .then((r)=>callback(null));
            }
            console.log("error in set session", err.response.status)
            callback(err)
        });
    }

    touch(sid, session, callback){
        console.log("touch session");
        return this.set(sid, session, callback);
    }
}

module.exports = MyStore;