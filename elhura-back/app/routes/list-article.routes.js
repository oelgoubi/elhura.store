module.exports = (app) => {
    const articleController = require("../controllers/article.controller.js");
    const favoritesController = require("../controllers/favorites.controller.js");
    const articleTagsController = require("../controllers/article-tags.controller.js");

    var router = require("express").Router();

    //Retrieve all Articles
    router.get("/", articleController.findAll);
    // Read a single Article
    router.get("/:idArticle", articleController.findOne);
    //Create a article
    router.post("/", articleController.create);
    // Update an article
    router.put("/:idArticle", articleController.update);
    // Delete a article by id
    router.delete("/:idArticle", articleController.deleteOne);
    // Delete all articles
    router.delete("/", articleController.deleteAll);

    //Create a articleTag
    router.post("/:id/tags", articleTagsController.create);
    //Retrieve all articleTags by tag id
    router.get("/:id/tags", articleTagsController.findByArticle);
    // Retrieve a single articleTag with idArticle and idTag
    router.get("/:idArticle/tags/:idTag", articleTagsController.findOne);
    // Delete a articleTag by tag
    router.delete("/:id/tags", articleTagsController.deleteByArticle);
    // Delete a articleTag by idArticle and idTag
    router.delete("/:idArticle/tags/:idTag", articleTagsController.deleteOne);

    app.use('/api/list-articles', router);
  };