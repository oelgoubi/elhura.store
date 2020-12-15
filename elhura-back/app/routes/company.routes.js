module.exports = app => {
    const companyController = require("../controllers/company.controller.js");
    const articleController = require("../controllers/article.controller.js");
    const favoritesController = require("../controllers/favorites.controller.js");
    const articleTagsController = require("../controllers/article-tags.controller.js");
  
    var router = require("express").Router();

    //Create a company
    router.post("/", companyController.create);
    //Retrieve all Companies
    router.get("/", companyController.findAll);
    // Retrieve a single company with id
    router.get("/:id", companyController.findOne);
    // Update a company by id
    router.put("/:id", companyController.update);
    // Delete a company by id
    router.delete("/:id", companyController.delete);

    //Create a article
    router.post("/:id/articles", articleController.create);
    //Retrieve all Articles
    router.get("/:id/articles", articleController.findByCompany);
    // Retrieve a single article with id
    router.get("/:idUser/articles/:idArticle", articleController.findOne);
    // Update a article by id
    router.put("/:idUser/articles/:idArticle", articleController.update);
    // Delete a article by id
    router.delete("/:idUser/articles/:idArticle", articleController.deleteOne);

    //Retrieve all Favorites
    router.get("/:idUser/articles/:idArticle/favorites", favoritesController.findByArticle);



    app.use('/api/companies', router);
  };