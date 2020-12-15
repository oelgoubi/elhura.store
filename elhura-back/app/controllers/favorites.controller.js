const db = require("../models");
const Favorites = db.Favorites;
const Op = db.Sequelize.Op;

// Create and Save a new Favorites
exports.create = (req, res) => {
    // Validate request
    if(!req.body.idArticle) {
        return res.status(400).send({
            message: "Article id can not be empty"
        });
    }

    const favorites = new Favorites({
        idArticle : req.body.idArticle,
        idUser : req.params.id
    });

    // Save Favorites in the database
    favorites.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Favorites."
        });
    });
};

// Find Favorites with a client id
exports.findByClient = (req, res) => {
    const id = req.params.id;

    Favorites.findAll({
        where: {
            idUser: id
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Favorites with idUser="+id
            });
        });
};

// Find Favorites with a article id
exports.findByArticle = (req, res) => {
    const idUser = req.params.idUser;
    const idArticle = req.params.idArticle;

    Favorites.findAll({
        where: {
            idUser: idUser,
            idArticle: idArticle
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Favorites with idArticle="+idArticle
            });
        });
};

// Find a single Favorites with an article id
exports.findOne = (req, res) => {
    const idUser = req.params.idUser;
    const idArticle = req.params.idArticle;

    Favorites.findOne({
        where: {
            idArticle: idArticle,
            idUser: idUser
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Favorites with idArticle=" + idArticle + " and idUser="+idUser
            });
        });
};

//Delete a favorites by id
exports.deleteOne = (req, res) => {
    Favorites.destroy({
        where : {
            idArticle: req.params.idArticle,
            idUser: req.params.idUser
        }
    })
        .then(favorites => {
            if(!favorites) {
                return res.status(404).send({
                    message: "Favorites not found with idArticle=" + req.params.idArticle + " and idUser="+req.params.idUser
                });
            }
            res.send({message: "Favorites deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Favorites not found with idArticle=" + req.params.idArticle + " and idUser="+req.params.idUser
            });
        }
        return res.status(500).send({
            message: "Could not delete favorites with idArticle=" + req.params.idArticle + " and idUser="+req.params.idUser
        });
    });
};

//Delete a favorites by id
exports.deleteByClient = (req, res) => {
    Favorites.destroy({
        where : {
            idUser: req.params.id
        }
    })
        .then(favorites => {
            if(!favorites) {
                return res.status(404).send({
                    message: "Favorites not found with idUser="+req.params.id
                });
            }
            res.send({message: "Favorites deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Favorites not found with idUser="+req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete favorites with idUser="+req.params.id
        });
    });
};

//Delete a favorites by id
exports.deleteByArticle = (req, res) => {
    Favorites.destroy({
        where : {
            idArticle: req.params.id
        }
    })
        .then(favorites => {
            if(!favorites) {
                return res.status(404).send({
                    message: "Favorites not found with idArticle="+req.params.id
                });
            }
            res.send({message: "Favorites deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Favorites not found with idArticle="+req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete favorites with idArticle="+req.params.id
        });
    });
};