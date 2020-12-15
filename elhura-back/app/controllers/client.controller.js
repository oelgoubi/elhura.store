const db = require("../models");
const Client = db.Client;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = (req, res) => {
    // Validate request
    if(!req.body.idUser) {
        return res.status(400).send({
            message: "Client id can not be empty"
        });
    }

    const client = new Client({
        idUser : req.body.idUser,
        idRole : req.body.idRole,
        idShipping : req.body.idShipping,
        idAddress : req.body.idAddress,
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        birthDate : req.body.birthDate,
        birthPlace : req.body.birthPlace
    });

    // Save Client in the database
    client.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
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
    if(!req.params.id) {
        return res.status(400).send({
            message: "Client id can not be empty"
        });
    }

    // Find note and update it with the request body
    Client.update({
        idRole : req.body.idRole,
        idShipping : req.body.idShipping,
        idAddress : req.body.idAddress,
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        birthDate : req.body.birthDate,
        birthPlace : req.body.birthPlace
    }, {
        where: {
            idUser: req.params.id
        }
    })
        .then(client => {
            if(!client) {
                return res.status(404).send({
                    message: "Client not found with id " + req.params.id
                });
            }
            res.send(client);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
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
        where : {
                idUser: req.params.id
            }
    })
        .then(client => {
            if(!client) {
                return res.status(404).send({
                    message: "Client not found with id " + req.params.id
                });
            }
            res.send({message: "Client deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete client with id " + req.params.id
        });
    });
};