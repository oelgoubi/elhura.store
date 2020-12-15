const db = require("../models");
const ArticleTags = db.ArticleTags;
const Op = db.Sequelize.Op;

// Create and Save a new ArticleTags
exports.create = (req, res) => {
    // Validate request
    if(!req.body.idTag) {
        return res.status(400).send({
            message: "Tag id can not be empty"
        });
    }

    const articleTags = new ArticleTags({
        idArticle : req.params.id,
        idTag : req.body.idTag
    });

    // Save ArticleTags in the database
    articleTags.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the ArticleTags."
        });
    });
};

// Find ArticleTags with a client id
exports.findByArticle = (req, res) => {
    const id = req.params.id;

    ArticleTags.findAll({
        where: {
            idArticle: id
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving ArticleTags with idArticle="+id
            });
        });
};

// Find ArticleTags with a client id
exports.findByTag = (req, res) => {
    const id = req.params.id;

    ArticleTags.findAll({
        where: {
            idTag: id
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving ArticleTags with idTag="+id
            });
        });
};

// Find a single ArticleTags with an article id
exports.findOne = (req, res) => {
    const idTag = req.params.idTag;
    const idArticle = req.params.idArticle;

    ArticleTags.findOne({
        where: {
            idArticle: idArticle,
            idTag: idTag
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving ArticleTags with idArticle=" + idArticle + " and idTag=" + idTag
            });
        });
};

//Delete a articleTags by ids
exports.deleteOne = (req, res) => {
    ArticleTags.destroy({
        where : {
            idArticle: req.params.idArticle,
            idTag: req.params.idTag
        }
    })
        .then(articleTags => {
            if(!articleTags) {
                return res.status(404).send({
                    message: "ArticleTags not found with idArticle=" + req.params.idArticle+ " and idTag="+req.params.idTag
                });
            }
            res.send({message: "ArticleTags deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "ArticleTags not found with idArticle=" + req.params.idArticle+ " and idTag="+req.params.idTag
            });
        }
        return res.status(500).send({
            message: "Could not delete articleTags with idArticle=" + req.params.idArticle+ " and idTag="+req.params.idTag
        });
    });
};

//Delete a articleTags by tag id
exports.deleteByTag = (req, res) => {
    ArticleTags.destroy({
        where : {
            idTag: req.params.id
        }
    })
        .then(articleTags => {
            if(!articleTags) {
                return res.status(404).send({
                    message: "ArticleTags not found with idTag="+req.params.id
                });
            }
            res.send({message: "ArticleTags deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "ArticleTags not found with idTag="+req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete articleTags with idTag="+req.params.id
        });
    });
};

//Delete a articleTags by id
exports.deleteByArticle = (req, res) => {
    ArticleTags.destroy({
        where : {
            idArticle: req.params.id
        }
    })
        .then(articleTags => {
            if(!articleTags) {
                return res.status(404).send({
                    message: "ArticleTags not found with idArticle="+req.params.id
                });
            }
            res.send({message: "ArticleTags deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "ArticleTags not found with idArticle="+req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete articleTags with idArticle="+req.params.id
        });
    });
};