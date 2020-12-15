const db = require("../models");
const Shipping = db.Shipping;
const Op = db.Sequelize.Op;

// Create and Save a new Shipping
exports.create = (req, res) => {
    // Validate request
    if(!req.body.idShipping) {
        return res.status(400).send({
            message: "Shipping id can not be empty"
        });
    }

    const shipping = new Shipping({
        idShipping : req.body.idShipping,
        shippingAddress : req.body.shippingAddress,
        billingAddress : req.body.billingAddress
    });

    // Save Shipping in the database
    shipping.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Shipping."
        });
    });
};

// Retrieve all Shippings from the database.
exports.findAll = (req, res) => {

    Shipping.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving shippings."
            });
        });
};

// Find a single Shipping with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Shipping.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Shipping with id=" + id
            });
        });
};

// Update an existing Shipping
exports.update = (req, res) => {
    // Validate Request
    if(!req.params.id) {
        return res.status(400).send({
            message: "Shipping id can not be empty"
        });
    }

    // Find note and update it with the request body
    Shipping.update({
        shippingAddress : req.body.shippingAddress,
        billingAddress : req.body.billingAddress
    }, {
        where: {
            idShipping: req.params.id
        }
    })
        .then(shipping => {
            if(!shipping) {
                return res.status(404).send({
                    message: "Shipping not found with id " + req.params.id
                });
            }
            res.send(shipping);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Shipping not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating shipping with id " + req.params.id
        });
    });
};

//Delete a shipping by id
exports.delete = (req, res) => {
    Shipping.destroy({
        where : {
            idShipping: req.params.id
        }
    })
        .then(shipping => {
            if(!shipping) {
                return res.status(404).send({
                    message: "Shipping not found with id " + req.params.id
                });
            }
            res.send({message: "Shipping deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Shipping not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete shipping with id " + req.params.id
        });
    });
};