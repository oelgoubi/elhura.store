require('dotenv').config()

var jwt = require('jsonwebtoken');

module.exports = {
    refreshToken: function(idUser, idRole) {
        // create a token witth jwt.sign and using a secret key
        const access_token = jwt.sign({ id : idUser,idRole : idRole }, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: 5*60 // expires in 5 minutes
        });
        return access_token;
    },

    generateToken: function(idUser, idRole) {
        const access_token = jwt.sign({ id : idUser,idRole : idRole }, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: 5*60 // expires in 5 minutes
        });
        const refresh_token = jwt.sign({ id : idUser,idRole : idRole }, process.env.REFRESH_TOKEN_ACCESS,{
            expiresIn: 2*60*60 // expires in 2 hours
        });
        return {access_token, refresh_token};
    },

    generateRegisterToken: function(idUser, idRole) {
        const register_token = jwt.sign({ id: idUser,idRole : idRole, status: "register"}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 5*60 // expires in 5 min
        });
        return register_token;
    }
}