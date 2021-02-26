const db = require("../models");
const Company = db.Company;
const Op = db.Sequelize.Op;
const config = require('../config/db.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
<<<<<<< HEAD
=======
const utils = require('../helpers/utils');
const mail = require('../services/mail');
const authService = require('../services/auth');
>>>>>>> 5826316d83ff39062b79eea4ccbaf53e99f4fadf

// Create and Save a new Company
exports.create = (req, res) => {
    // Validate request
    if(!req.body.idUser) {
        return res.status(400).send({
            message: "Company id can not be empty"
        });
    }

    let verifyCode = utils.getRandomCode();

    const company = new Company({
        idUser : req.body.idUser,
        idRole : req.body.idRole,
        idAddress : req.body.idAddress,
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        name : req.body.name,
        siret : req.body.siret,
        documents : req.body.documents,
        isValid: false,
        validationCode: verifyCode
    });

    // Save Company in the database
    company.save()
        .then(data => {
            // create a token
<<<<<<< HEAD
            const token = jwt.sign({ id: data.idUser,idRole : data.idRole }, config.ACCESS_TOKEN_SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token,
            newUser :{
                username: data.username,
                email: data.email,
                idRole: data.idRole,
            } });
=======

            const token = authService.generateRegisterToken(data.idUser, data.idRole);
            console.log("DATA : "+data)
            let mailConfirmationOptions = mail.mailConfirmationOptions(data.email, verifyCode);

            mail.smtpTransport().sendMail(mailConfirmationOptions, function(error, response){
                if(error){
                    console.log(error);
                    res.end("error");
                }else{
                    console.log("Message sent: " + response.message);
                    res.end("sent");
                }
            });

            res.cookie('access_token', token, { httpOnly : true, maxAge : 3600*1000 });
            res.cookie('canConfirmRegister', true, { httpOnly : true, maxAge : 2*3600*1000});
            res.clearCookie('canMakeRegisterChoice');

            res.status(200).send({ auth: true,
                newUser :{
                    username: data.username,
                    email: data.email,
                    idRole: data.idRole,
                } });
>>>>>>> 5826316d83ff39062b79eea4ccbaf53e99f4fadf

        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Company."
        });
    });
};

// Retrieve all Companies from the database.
exports.findAll = (req, res) => {

    Company.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving companies."
            });
        });
};

// Find a single Company with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Company.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Company with id=" + id
            });
        });
};

// Update an existing Company
exports.update = (req, res) => {
    // Validate Request
    if(!req.params.id) {
        return res.status(400).send({
            message: "Company id can not be empty"
        });
    }

    // Find note and update it with the request body
    Company.update({
        idRole : req.body.idRole,
        idAddress : req.body.idAddress,
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        name : req.body.name,
        siret : req.body.siret,
        documents : req.body.documents
    }, {
        where: {
            idUser: req.params.id
        }
    })
        .then(company => {
            if(!company) {
                return res.status(404).send({
                    message: "Company not found with id " + req.params.id
                });
            }
            res.send(company);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating company with id " + req.params.id
        });
    });
};

//Delete a company by id
exports.delete = (req, res) => {
    Company.destroy({
        where : {
            idUser: req.params.id
        }
    })
        .then(company => {
            if(!company) {
                return res.status(404).send({
                    message: "Company not found with id " + req.params.id
                });
            }
            res.send({message: "Company deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete company with id " + req.params.id
        });
    });
};