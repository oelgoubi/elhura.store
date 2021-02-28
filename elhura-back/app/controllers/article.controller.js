require('dotenv').config()

const db = require("../models");
const Article = db.Article;
const Client = db.Client;
const Company = db.Company;
const Op = db.Sequelize.Op;

// Create and Save a new Article
exports.create = async (req, res) => {
    const email = req.cookies.email;

    const company = await Company.findAll({
                        where: {
                            email: email
                        }
                    })

    console.log("EMAIL : ")
    console.log(company[0].email)

    if (company) {
        const article = new Article({
            idUser : company[0].idUser,
            idCategory : req.body.idCategory,
            designation : req.body.designation,
            unitPrice : req.body.unitPrice,
            wholesalePrice : req.body.wholesalePrice,
            avatarUrl : process.env.APP_URL+"/api/files/"+req.body.avatarName,
            description : req.body.description
        });

        try{
            // Save Article in the database
            const response = await article.save()
            res.send(response.data);
        }catch(err){
            console.log("ERROR : ")
            console.log(err.message)
                res.status(500).send({
                message: err.message || "Some error occurred while creating the Article."
            });
        }
    } else{
        // Validate request
        return res.status(400).send({
            message: "Article id can not be empty"
        });
    }
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
exports.update = async (req, res) => {
    // Validate Request
    console.log("ID ARTICLE : "+req.params.idArticle)
    console.log("AVATAR : "+req.body.avatarName)
    if(!req.params.idArticle) {
        return res.status(400).send({
            message: "Article id can not be empty"
        });
    }

    // Find note and update it with the request body
    try{
        const article = await Article.update({
            idCategory : req.body.idCategory,
            designation : req.body.designation,
            unitPrice : req.body.unitPrice,
            wholesalePrice : req.body.wholesalePrice,
            avatarUrl : req.body.avatarName !== undefined ? process.env.APP_URL+"/api/files/"+req.body.avatarName : this.avatarUrl,
            description : req.body.description
        }, {
            where: {
                idArticle: req.params.idArticle
            }
        })

        if(!article) {
            return res.status(404).send({
                message: "Article not found with id " + req.params.idArticle
            });
        }

        res.send(article);
    }catch(err){
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Article not found with id " + req.params.idArticle
            });
        }
        return res.status(500).send({
            message: "Error updating article with id " + (req.params.idArticle !== undefined ? req.params.idArticle : "")
        });
    }
};

//Delete a article by id
exports.deleteOne = async (req, res) => {
    try {
        const article = await Article.destroy({
            where: {
                idArticle: req.params.idArticle
            }
        })

        if (!article) {
            return res.status(404).send({
                message: "Article not found with idUser=" + req.params.idUser + " idArticle=" + req.params.idArticle
            });
        }
        res.send({message: "Article deleted successfully!"});
    } catch(err) {
        console.log("THE ERROR : ")
        console.log(err.message)
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Article not found with idUser="+req.params.idUser+ " idArticle=" + req.params.idArticle
            });
        }
        return res.status(500).send({
            message: "Could not delete article with idUser="+req.params.idUser+ " idArticle=" + req.params.idArticle
        });
    }
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