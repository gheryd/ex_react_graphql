const {createAxiosInstance} = require("../utils/model_utils");
const axios = createAxiosInstance();

class Task {
    getAllByUser(userId){
        return axios.get(`/tasks`, {
            params: {userId}
        }).then((res)=>{
            return res.data
        })
    }

    async get(id, userId){
        return axios.get(`/tasks/${id}`, {
            params: {userId}
        }).then((res)=>{
            return res.data
        })
    }
    async add(content, userId){
        return axios.post(`/tasks`, 
            {content, userId}
        ).then((res)=>{
            return res.data
        })
    }

    async remove(id, userId){
        return axios.delete(`/tasks/${id}`, {
            params: {userId}
        }).then((res)=>{
            return res.data
        })
    }

}

module.exports = Task;