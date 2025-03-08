function genString(length){
    let source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz0123456789";
    let result ="";
    for (let index = 0; index < length; index++) {
        let rd = Math.floor(Math.random()*source.length);
        result+=source.charAt(rd);
    }
    return result;
}
function genStringNumber(length){
    let source = "0123456789";
    let result ="";
    for (let index = 0; index < length; index++) {
        let rd = Math.floor(Math.random()*source.length);
        result+=source.charAt(rd);
    }
    return result;
}
module.exports={
    genS: genString,
    genN:genStringNumber
}