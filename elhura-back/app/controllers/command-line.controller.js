const db = require("../models");
const CommandLine = db.CommandLine;
const Op = db.Sequelize.Op;

// Create and Save a new CommandLine
exports.create = (req, res) => {
    // Validate request
    if(!req.body.idCommandLine) {
        return res.status(400).send({
            message: "CommandLine id can not be empty"
        });
    }

    const commandLine = new CommandLine({
        idCommandLine : req.body.idCommandLine,
        idCommand : req.params.id,
        idShipping : req.body.idShipping,
        idArticle : req.body.idArticle,
        quantityArticleCommandLine : req.body.quantityArticleCommandLine,
        subtotal : req.body.subtotal
    });

    // Save CommandLine in the database
    commandLine.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the CommandLine."
        });
    });
};

// Retrieve all CommandLines from the database.
exports.findAll = (req, res) => {

    CommandLine.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving commandLines."
            });
        });
};

exports.findByCommand = (req, res) => {

    CommandLine.findAll({
            where: {
                idCommand: req.params.id
            }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving commandLines."
            });
        });
};

// Find a single CommandLine with an id
exports.findOne = (req, res) => {
    const idCommand = req.params.idCommand;
    const idCommandLine = req.params.idCommandLine;

    CommandLine.findAll({
        where: {
            idCommand: idCommand,
            idCommandLine: idCommandLine
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving CommandLine with id=" + id
            });
        });
};

// Update an existing CommandLine
exports.update = (req, res) => {
    const idCommand = req.params.idCommand;
    const idCommandLine = req.params.idCommandLine;
    // Validate Request
    if(!idCommand || !idCommandLine) {
        return res.status(400).send({
            message: "Command or CommandLine id can not be empty"
        });
    }

    // Find note and update it with the request body
    CommandLine.update({
        idShipping : req.body.idShipping,
        idArticle : req.body.idArticle,
        quantityArticleCommandLine : req.body.quantityArticleCommandLine,
        subtotal : req.body.subtotal
    }, {
        where: {
            idCommand: idCommand,
            idCommandLine: idCommandLine
        }
    })
        .then(commandLine => {
            if(!commandLine) {
                return res.status(404).send({
                    message: "CommandLine not found with id " + req.params.id
                });
            }
            res.send(commandLine);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "CommandLine not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating commandLine with id " + req.params.id
        });
    });
};

//Delete a commandLine by id
exports.deleteByCommand = (req, res) => {
    CommandLine.destroy({
        where : {
            idCommand: req.params.id
        }
    })
        .then(commandLine => {
            if(!commandLine) {
                return res.status(404).send({
                    message: "CommandLine not found with idCommand=" + req.params.id
                });
            }
            res.send({message: "CommandLine deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "CommandLine not found with idCommand=" + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete commandLine with idCommand=" + req.params.id
        });
    });
};

//Delete a commandLine by id
exports.deleteOne = (req, res) => {
    CommandLine.destroy({
        where : {
            idCommand: req.params.idCommand,
            idCommandLine: req.params.idCommandLine
        }
    })
        .then(commandLine => {
            if(!commandLine) {
                return res.status(404).send({
                    message: "CommandLine not found with idCommand=" + req.params.idCommand + " idCommandLine="+req.params.idCommandLine
                });
            }
            res.send({message: "CommandLine deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "CommandLine not found with idCommand=" + req.params.idCommand + " idCommandLine="+req.params.idCommandLine
            });
        }
        return res.status(500).send({
            message: "Could not delete commandLine with idCommand=" + req.params.idCommand + " idCommandLine="+req.params.idCommandLine
        });
    });
};