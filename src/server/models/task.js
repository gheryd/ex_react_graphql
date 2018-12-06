const config = require("config");
const axios = require("axios");

class Task {
    getAll(){
        return axios.get(`http://localhost:3001/tasks`).then((res)=>{
            return res.data
        })
    }

    async get(id){
        return axios.get(`http://localhost:3001/tasks/${id}`).then((res)=>{
            return res.data
        })
    }
    async add(content){
        return axios.post(`http://localhost:3001/tasks`, {content}).then((res)=>{
            return res.data
        })
    }

    async update(task){
        //TODO
    }
    async remove(id){
        return axios.delete(`http://localhost:3001/tasks/${id}`, {id}).then((res)=>{
            return res.data
        })
    }

}

module.exports = Task;