const db = require("../models");
const Command = db.Command;
const Op = db.Sequelize.Op;

// Create and Save a new Command
exports.create = (req, res) => {
    // Validate request
    if(!req.body.idCommand) {
        return res.status(400).send({
            message: "Command id can not be empty"
        });
    }

    const command = new Command({
        idCommand : req.body.idCommand,
        dateCommand : req.body.dateCommand,
        status : req.body.status,
        commandLinesNumber : req.body.commandLinesNumber,
        total : req.body.total
    });

    // Save Command in the database
    command.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Command."
        });
    });
};

// Retrieve all Commands from the database.
exports.findAll = (req, res) => {

    Command.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving commands."
            });
        });
};

// Find a single Command with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Command.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Command with id=" + id
            });
        });
};

// Update an existing Command
exports.update = (req, res) => {
    // Validate Request
    if(!req.params.id) {
        return res.status(400).send({
            message: "Command id can not be empty"
        });
    }

    // Find note and update it with the request body
    Command.update({
        dateCommand : req.body.dateCommand,
        status : req.body.status,
        commandLinesNumber : req.body.commandLinesNumber,
        total : req.body.total
    }, {
        where: {
            idCommand: req.params.id
        }
    })
        .then(command => {
            if(!command) {
                return res.status(404).send({
                    message: "Command not found with id " + req.params.id
                });
            }
            res.send(command);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Command not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating command with id " + req.params.id
        });
    });
};

//Delete a command by id
exports.delete = (req, res) => {
    Command.destroy({
        where : {
            idCommand: req.params.id
        }
    })
        .then(command => {
            if(!command) {
                return res.status(404).send({
                    message: "Command not found with id " + req.params.id
                });
            }
            res.send({message: "Command deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Command not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete command with id " + req.params.id
        });
    });
};