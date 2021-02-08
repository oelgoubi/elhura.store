module.exports = (app,authenticateToken) => {
    const companyController = require("../controllers/company.controller.js");
    const articleController = require("../controllers/article.controller.js");
    const favoritesController = require("../controllers/favorites.controller.js");
    const articleTagsController = require("../controllers/article-tags.controller.js");
  
    var router = require("express").Router();

    //Create a company
    router.post("/", authenticateToken, companyController.create);
    //Retrieve all Companies
    router.get("/", authenticateToken, companyController.findAll);
    // Retrieve a single company with id
    router.get("/:id", authenticateToken, companyController.findOne);
    // Update a company by id
    router.put("/:id", authenticateToken, companyController.update);
    // Delete a company by id
    router.delete("/:id", authenticateToken, companyController.delete);

    //Retrieve all Favorites
    router.get("/:idUser/articles/:idArticle/favorites", authenticateToken, favoritesController.findByArticle);

    app.use('/api/companies', router);
  };