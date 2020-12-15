const db = require("../models");
const CartElement = db.CartElement;
const Op = db.Sequelize.Op;

// Create and Save a new CartElement
exports.create = (req, res) => {
    // Validate request
    if(!req.body.idCartElement) {
        return res.status(400).send({
            message: "CartElement id can not be empty"
        });
    }

    const cartElement = new CartElement({
        idCartElement : req.body.idCartElement,
        idArticle : req.body.idArticle,
        idUser : req.body.idUser,
        quantityArticleCartElement : req.body.quantityArticleCartElement
    });

    // Save CartElement in the database
    cartElement.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the CartElement."
        });
    });
};

// Retrieve all CartElements from the database.
exports.findAll = (req, res) => {

    CartElement.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cartElements."
            });
        });
};

// Find a single CartElement with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    CartElement.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving CartElement with id=" + id
            });
        });
};

// Update an existing CartElement
exports.update = (req, res) => {
    // Validate Request
    if(!req.params.id) {
        return res.status(400).send({
            message: "CartElement id can not be empty"
        });
    }

    // Find note and update it with the request body
    CartElement.update({
        idArticle : req.body.idArticle,
        idUser : req.body.idUser,
        quantityArticleCartElement : req.body.quantityArticleCartElement
    }, {
        where: {
            idCartElement: req.params.id
        }
    })
        .then(cartElement => {
            if(!cartElement) {
                return res.status(404).send({
                    message: "CartElement not found with id " + req.params.id
                });
            }
            res.send(cartElement);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "CartElement not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating cartElement with id " + req.params.id
        });
    });
};

//Delete a cartElement by id
exports.delete = (req, res) => {
    CartElement.destroy({
        where : {
            idCartElement: req.params.id
        }
    })
        .then(cartElement => {
            if(!cartElement) {
                return res.status(404).send({
                    message: "CartElement not found with id " + req.params.id
                });
            }
            res.send({message: "CartElement deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "CartElement not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete cartElement with id " + req.params.id
        });
    });
};