const axios = require("axios");

function checkScalarResult(res){
    let row  = res.data;
    if(Array.isArray(row)){
        row = row.legth==0 ? null : row[0]
    }
    return row;
}

function createAxiosInstance(){
    return axios.create({
        baseURL: 'http://localhost:3001',
        timeout: 20000
    });
}

module.exports = {checkScalarResult, createAxiosInstance};