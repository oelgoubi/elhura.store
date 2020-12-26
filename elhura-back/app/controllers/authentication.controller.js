const db = require("../models");
const Op = db.Sequelize.Op;

// Register a new User
exports.register = (req, res) => {
    // Get the email and password 

    // Check if the email valid ( Optionnal )

    // Hash the password with bcrypt

    // Save the user in the DB and return it without password 

};

// Authenticate a new User
exports.login = (req, res) => {

    // Check if the user exist using the mail and use bcrypt to compare the pwd

    // create a token witth jwt.sign and using a secret key

    // Return the token 

   
};

// Log Out a new User
exports.logout = (req, res) => {
   
};


// check the validity of the token after eacg request
exports.isAuthenticated = (req, res) => {
   
};

