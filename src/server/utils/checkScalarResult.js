function checkScalarResult(res){
    let row  = res.data;
    if(Array.isArray(row)){
        row = row.legth==0 ? null : row[0]
    }
    return row;
}


module.exports = checkScalarResult;