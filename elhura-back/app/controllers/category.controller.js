const db = require("../models");
const Category = db.Category;
const Op = db.Sequelize.Op;

// Create and Save a new Category
exports.create = (req, res) => {
    // Validate request
    if(!req.body.idCategory) {
        return res.status(400).send({
            message: "Category id can not be empty"
        });
    }

    const category = new Category({
        idCategory : req.body.idCategory,
        nameCategory : req.body.nameCategory
    });

    // Save Category in the database
    category.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Category."
        });
    });
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {

    Category.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories."
            });
        });
};

// Find a single Category with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Category with id=" + id
            });
        });
};

// Update an existing Category
exports.update = (req, res) => {
    // Validate Request
    if(!req.params.id) {
        return res.status(400).send({
            message: "Category id can not be empty"
        });
    }

    // Find note and update it with the request body
    Category.update({
        nameCategory : req.body.nameCategory
    }, {
        where: {
            idCategory: req.params.id
        }
    })
        .then(category => {
            if(!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.id
                });
            }
            res.send(category);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating category with id " + req.params.id
        });
    });
};

//Delete a category by id
exports.delete = (req, res) => {
    Category.destroy({
        where : {
            idCategory: req.params.id
        }
    })
        .then(category => {
            if(!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.id
                });
            }
            res.send({message: "Category deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete category with id " + req.params.id
        });
    });
};