const db = require("../models");
const Company = db.Company;
const Op = db.Sequelize.Op;

// Create and Save a new Company
exports.create = (req, res) => {
    // Validate request
    if(!req.body.idUser) {
        return res.status(400).send({
            message: "Company id can not be empty"
        });
    }

    const company = new Company({
        idUser : req.body.idUser,
        idRole : req.body.idRole,
        idAddress : req.body.idAddress,
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        name : req.body.name,
        siret : req.body.siret,
        documents : req.body.documents
    });

    // Save Company in the database
    company.save()
        .then(data => {
            res.send(data);
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