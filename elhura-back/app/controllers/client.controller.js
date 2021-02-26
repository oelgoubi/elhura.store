const db = require("../models");
const Client = db.Client;
const Op = db.Sequelize.Op;
const config = require('../config/db.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const utils = require('../helpers/utils');
const mail = require('../services/mail');
const authService = require('../services/auth');

// Create and Save a new Client
exports.create = (req, res) => {
    console.log(req.body)
    // Validate request
    if (!req.body.idUser) {
        return res.status(400).send({
            message: "Client id can not be empty"
        });
    }

    let verifyCode = utils.getRandomCode();

    const client = new Client({
        idUser: req.body.idUser,
        idRole: req.body.idRole,
        idShipping: null,
        idAddress: null,
        username: null,
        password: req.body.password,
        email: req.body.email,
        firstName: null,
        lastName: null,
        birthDate: null,
        birthPlace: null,
        isValid: false,
        validationCode: verifyCode
    });

    // Save Client in the database
    client.save()
        .then(data => {
             // create a token
            console.log("MIKE 1")
            const token = authService.generateRegisterToken(data.idUser, data.idRole);
            console.log("MIKE 2")
            let mailConfirmationOptions = mail.mailConfirmationOptions(data.email, verifyCode);
            console.log("MIKE 3")
            mail.smtpTransport().sendMail(mailConfirmationOptions, function(error, response){
                if(error){
                    console.log(error);
                    res.end("error");
                }else{
                    console.log("Message sent: " + response.message);
                    res.end("sent");
                }
            });
            console.log("MIKE 4")
            res.cookie('access_token', token, { httpOnly : true, maxAge : 3600*1000 });
            res.cookie('canConfirmRegister', true, { httpOnly : true, maxAge : 2*3600*1000});
            res.clearCookie('canMakeRegisterChoice');

            res.send({ auth: true,
                newUser :{
                    username: data.username,
                    email: data.email,
                    idRole: data.idRole,
                } });
        }).catch(err => {
            console.log("ERROR : "+err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Client."
            });
        });
};

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {

    Client.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving clients."
            });
        });
};

// Find a single Client with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Client.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Client with id=" + id
            });
        });
};

// Update an existing Client
exports.update = (req, res) => {
    // Validate Request
    if (!req.params.id) {
        return res.status(400).send({
            message: "Client id can not be empty"
        });
    }

    // Find note and update it with the request body
    Client.update({
        idRole: req.body.idRole,
        idShipping: req.body.idShipping,
        idAddress: req.body.idAddress,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        birthPlace: req.body.birthPlace
    }, {
        where: {
            idUser: req.params.id
        }
    })
        .then(client => {
            if (!client) {
                return res.status(404).send({
                    message: "Client not found with id " + req.params.id
                });
            }
            res.send(client);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Client not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating client with id " + req.params.id
            });
        });
};

//Delete a client by id
exports.delete = (req, res) => {
    Client.destroy({
        where: {
            idUser: req.params.id
        }
    })
        .then(client => {
            if (!client) {
                return res.status(404).send({
                    message: "Client not found with id " + req.params.id
                });
            }
            res.send({ message: "Client deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Client not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete client with id " + req.params.id
            });
        });
};