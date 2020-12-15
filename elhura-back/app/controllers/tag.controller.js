const db = require("../models");
const Tag = db.Tag;
const Op = db.Sequelize.Op;

// Create and Save a new Tag
exports.create = (req, res) => {
    // Validate request
    if(!req.body.idTag) {
        return res.status(400).send({
            message: "Tag id can not be empty"
        });
    }

    const tag = new Tag({
        idTag : req.body.idTag,
        nameTag : req.body.nameTag
    });

    // Save Tag in the database
    tag.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Tag."
        });
    });
};

// Retrieve all Tags from the database.
exports.findAll = (req, res) => {

    Tag.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tags."
            });
        });
};

// Find a single Tag with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tag.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tag with id=" + id
            });
        });
};

// Update an existing Tag
exports.update = (req, res) => {
    // Validate Request
    if(!req.params.id) {
        return res.status(400).send({
            message: "Tag id can not be empty"
        });
    }

    // Find note and update it with the request body
    Tag.update({
        nameTag : req.body.nameTag
    }, {
        where: {
            idTag: req.params.id
        }
    })
        .then(tag => {
            if(!tag) {
                return res.status(404).send({
                    message: "Tag not found with id " + req.params.id
                });
            }
            res.send(tag);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Tag not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating tag with id " + req.params.id
        });
    });
};

//Delete a tag by id
exports.delete = (req, res) => {
    Tag.destroy({
        where : {
            idTag: req.params.id
        }
    })
        .then(tag => {
            if(!tag) {
                return res.status(404).send({
                    message: "Tag not found with id " + req.params.id
                });
            }
            res.send({message: "Tag deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Tag not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete tag with id " + req.params.id
        });
    });
};