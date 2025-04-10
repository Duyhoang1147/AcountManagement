const account = require('../model/account');

function checkAccount(email) {
    if(account.findOne({email})) {
        return true;
    }
    return false;
}

module.exports = {
    checkAccount: checkAccount
}