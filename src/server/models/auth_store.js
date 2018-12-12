const {checkScalarResult, createAxiosInstance} = require("../utils/model_utils");
const Store = require("express-session/session/store")

const axios = createAxiosInstance();

async function getSession(sid){
    try {
        console.log("[getSession] search sid:", sid);
        const sess = await axios.get(`/sessions/${sid}`).then(checkScalarResult);
        if(!sess){
            console.log("[getSession] sess not found ", sid);
            return;
        }
        console.log("[getSession] found:", sess);
        var expires = typeof sess.cookie.expires === 'string'
                ? new Date(sess.cookie.expires)
                : sess.cookie.expires;
        if (expires && expires <= Date.now()) {
            console.log("[getSession] session is expired, deleting...");
            await axios.delete(`/sessions/${sid}`).then(checkScalarResult);
            return;
        }
        return sess;
    }catch(err){
        if(err && err.response && err.response.status===404){
            console.log("[getSession] session not found (status=404)")
            return;
        }
        console.log("[getSession] throw error")
        throw err;
    }
}

async function getSectionList(){
    const sessions = await axios.get("/sessions/");
    return sessions;
}

class MyStore extends Store{

    async all(callback){
        const sessions = await getSectionList();
        const sessionsMap = [];
        for(let i=0; i<sessions.length; i++){
            let sid = session.id; 
            let session = await getSession(sid);
            if(session){
                sessionMap[sid] = session;
            }
        }
        console.log("[Store.all] return sessions:", sessionsMap);
        callback(null, sessionsMap);
    }

    async clear(callback){
        const sessions = await getSectionList();
        for(let i=0; i<sessions.length; i++){
            await axios.delete(`/sessions/${sid}`);
        }
        callback();
    }

    async destroy(sid, callback) {
        console.log("[Store.destroy] sid:",sid);
        axios.delete(`/sessions/${sid}`)
            .then(checkScalarResult)
            .then((r)=> {
                console.log("[Store.destroy] callback ok");
                callback && callback(null);
            }).catch(err=>{
                console.log("[Store.destroy] error:", err);
                callback && callback(err);
            });
    }

    async get(sid, callback){
        console.log("[Store.get] sid: ", sid);
        try {
            const sess = await getSession(sid);
            if(!sess){
                console.log("[Store.get] session not found with sid:", sid);
                return callback();
            }else {
                console.log("[Store.get] session found:", sess);
                callback(null, sess);
            }
        }catch(err){
            console.log("[Store.get] error:", err);
            callback(err);
        }
    }

    async set(sid, session, callback){
        console.log("[Store.set] sid:", sid);
        try{
            const sess = await getSession(sid);
            if(sess){
                console.log("[Store.set] session already exists, update session:", sid);
                axios.put(`/sessions/${sid}`, session).then(
                    (r) => callback(null, session)
                );
            }else {
                console.log("[Store.set] session not exists, create new one:", sid);
                var data = {...session, id:sid};
                console.log("[Store.set] post data:", data);
                return axios.post(`/sessions/`,data )
                    .then(checkScalarResult)
                    .then((r)=>callback(null, session));
            }
        }catch(err){
            console.log("[Store.set] error:", err);
            callback(err);
        }
    }

    length(callback) {
        const sessions = getSectionList();
        callback(null, sessions.length);
    }

    async touch(sid, session, callback){
        console.log("[Store.touch] sid, session:", sid, session);
        try{
            const currentSession = await getSession(sid);
            if(currentSession){
                console.log("[Store.touch] found current session for cookie updating cookie:", currentSession);
                currentSession.cookie = session.cookie;
                await axios.post(`/sessions/`,data )
                    .then(checkScalarResult)
                    .then((r)=>callback() );
            }else {
                console.log("[Store.touch]");
                callback();
            }
        }catch(err){
            console.log("[Store.touch] error:", err);
            callback(err);
        }
    }
}

module.exports = MyStore;