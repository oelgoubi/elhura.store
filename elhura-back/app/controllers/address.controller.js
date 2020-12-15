const db = require("../models");
const Address = db.Address;
const Op = db.Sequelize.Op;

// Create and Save a new Address
exports.create = (req, res) => {
    // Validate request
    if(!req.body.idAddress) {
        return res.status(400).send({
            message: "Address id can not be empty"
        });
    }

    const address = new Address({
        idAddress : req.body.idAddress,
        street : req.body.street,
        postalCode : req.body.postalCode,
        city : req.body.city,
        region : req.body.region,
        country : req.body.country
    });

    // Save Address in the database
    address.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Address."
        });
    });
};

// Retrieve all Addresss from the database.
exports.findAll = (req, res) => {

    Address.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving addresses."
            });
        });
};

// Find a single Address with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Address.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Address with id=" + id
            });
        });
};

// Update an existing Address
exports.update = (req, res) => {
    // Validate Request
    if(!req.params.id) {
        return res.status(400).send({
            message: "Address id can not be empty"
        });
    }

    // Find note and update it with the request body
    Address.update({
        street : req.body.street,
        postalCode : req.body.postalCode,
        city : req.body.city,
        region : req.body.region,
        country : req.body.country
    }, {
        where: {
            idAddress: req.params.id
        }
    })
        .then(address => {
            if(!address) {
                return res.status(404).send({
                    message: "Address not found with id " + req.params.id
                });
            }
            res.send(address);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Address not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating address with id " + req.params.id
        });
    });
};

//Delete a address by id
exports.delete = (req, res) => {
    Address.destroy({
        where : {
            idAddress: req.params.id
        }
    })
        .then(address => {
            if(!address) {
                return res.status(404).send({
                    message: "Address not found with id " + req.params.id
                });
            }
            res.send({message: "Address deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Address not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete address with id " + req.params.id
        });
    });
};