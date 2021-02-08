const db = require("../models");
const Article = db.Article;
const Op = db.Sequelize.Op;

// Create and Save a new Article
exports.create = (req, res) => {
    // Validate request
    if(!req.body.idArticle) {
        return res.status(400).send({
            message: "Article id can not be empty"
        });
    }

    const article = new Article({
        idArticle : req.body.idArticle,
        idUser : req.params.id,
        idCategory : req.body.idCategory,
        designation : req.body.designation,
        unitPrice : req.body.unitPrice,
        wholesalePrice : req.body.wholesalePrice
    });

    // Save Article in the database
    article.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Article."
        });
    });
};

// Retrieve all Articles from the database.
exports.findAll = (req, res) => {

    Article.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving articles."
            });
        });
};

// Retrieve all Articles by Company id
exports.findByCompany = (req, res) => {

    Article.findAll({
        where : {
            idUser: req.params.id
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving articles."
            });
        });
};

// Retrieve all Articles by Company id
exports.findByName = (req, res) => {

    Article.findAll({
        where : {
            designation: req.params.designation
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving articles."
            });
        });
};

// Find a single Article with an id
exports.findOne = (req, res) => {
    const idUser = req.params.idUser;
    const idArticle = req.params.idArticle;

    Article.findAll({
        where : {
            idUser: idUser,
            idArticle: idArticle
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Article with idArticle=" + idArticle + " idUser="+idUser
            });
        });
};

// Update an existing Article
exports.update = (req, res) => {
    // Validate Request
    if(!req.params.id) {
        return res.status(400).send({
            message: "Article id can not be empty"
        });
    }

    // Find note and update it with the request body
    Article.update({
        idCategory : req.body.idCategory,
        designation : req.body.designation,
        unitPrice : req.body.unitPrice,
        wholesalePrice : req.body.wholesalePrice
    }, {
        where: {
            idArticle: req.params.idArticle
        }
    })
        .then(article => {
            if(!article) {
                return res.status(404).send({
                    message: "Article not found with id " + req.params.id
                });
            }
            res.send(article);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Article not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating article with id " + req.params.id
        });
    });
};

//Delete a article by id
exports.deleteOne = (req, res) => {
    Article.destroy({
        where : {
            idUser: req.params.idUser,
            idArticle: req.params.idArticle
        }
    })
        .then(article => {
            if(!article) {
                return res.status(404).send({
                    message: "Article not found with idUser="+req.params.idUser+ " idArticle=" + req.params.idArticle
                });
            }
            res.send({message: "Article deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Article not found with idUser="+req.params.idUser+ " idArticle=" + req.params.idArticle
            });
        }
        return res.status(500).send({
            message: "Could not delete article with idUser="+req.params.idUser+ " idArticle=" + req.params.idArticle
        });
    });
};

//Delete a article by id
exports.deleteAll = (req, res) => {
    Article.destroy()
        .then(article => {
            if(!article) {
                return res.status(404).send({
                    message: "Article not found with idUser="+req.params.idUser+ " idArticle=" + req.params.idArticle
                });
            }
            res.send({message: "Article deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Article not found with idUser="+req.params.idUser+ " idArticle=" + req.params.idArticle
            });
        }
        return res.status(500).send({
            message: "Could not delete article with idUser="+req.params.idUser+ " idArticle=" + req.params.idArticle
        });
    });
};

//Delete a article by id
exports.deleteByCompany = (req, res) => {
    Article.destroy({
        where : {
            idUser: req.params.id
        }
    })
        .then(article => {
            if(!article) {
                return res.status(404).send({
                    message: "Article not found with idUser="+req.params.id
                });
            }
            res.send({message: "Article deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Article not found with idUser="+req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete article with idUser="+req.params.id
        });
    });
};