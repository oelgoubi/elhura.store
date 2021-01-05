const db = require("../models");
const Client = db.Client;
const Company = db.Company;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/db.config');

const clientController = require("./client.controller.js");
const adminController = require("./admin.controller.js");
const companyController = require("./company.controller.js");



// Register a new User
exports.register = (req, res) => {
    // Get the important field
    const { idRole } = req.body;

    // Check the validity of the email 

     // Hash the password with bcrypt
    const hashedPassword = bcrypt.hashSync(req.body.password, 8); 
    req.body.password = hashedPassword;
    switch(idRole)
    {
        case 0:
            adminController.create(req,res);
            break;
        case 1:
            clientController.create(req,res)
            break;
        case 2:
            companyController.create(req,res)
            break;
        default:
            return res.json({
                message : 'Server Error'
            })

    }   

};

// Authenticate a new User
exports.login = async (req, res) => {
    let user;

    // Check if the user exist using the mail and use bcrypt to compare the pwd
     user = await Client.findAll({ where :{
        email : req.body.email
    }})
    if(user.length === 0)
    {
        user = await Company.findAll({ where :{
            email : req.body.email
        }})
        if(user.length === 0)
        {
            user = await Admin.findAll({ where :{
                idUser : req.body.idUser
            }})
            if(user.length === 0)
           {
               res.json(404).send({
                   message:'User Not Found'
               })
           }
        }
        
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password,  user[0].password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    // create a token witth jwt.sign and using a secret key
    const token = jwt.sign({ id : user[0].idUser,idRole : user[0].idRole }, config.ACCESS_TOKEN_SECRET,{
      expiresIn: 86400 // expires in 24 hours
    });
    
    // Return the token 
    res.status(200).send({ auth: true, token: token, userRole :user[0].idRole,idUser : user[0].idUser });   
};

// Log Out a new User
exports.logout = (req, res) => {
   
};


// check the validity of the token after eacg request
exports.isAuthenticated = (req, res) => {
   
};

