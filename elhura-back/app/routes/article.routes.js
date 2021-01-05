module.exports = (app,authenticateToken) => {
    const articleController = require("../controllers/article.controller.js");
    const favoritesController = require("../controllers/favorites.controller.js");
    const articleTagsController = require("../controllers/article-tags.controller.js");

    var router = require("express").Router();

    //Retrieve all Articles
    router.get("/", articleController.findAll);

    //Create a articleTag
    router.post("/:id/tags", authenticateToken,articleTagsController.create);
    //Retrieve all articleTags by tag id
    router.get("/:id/tags", articleTagsController.findByArticle);
    // Retrieve a single articleTag with idArticle and idTag
    router.get("/:idArticle/tags/:idTag", articleTagsController.findOne);
    // Delete a articleTag by tag
    router.delete("/:id/tags", authenticateToken,articleTagsController.deleteByArticle);
    // Delete a articleTag by idArticle and idTag
    router.delete("/:idArticle/tags/:idTag",authenticateToken, articleTagsController.deleteOne);

    app.use('/api/articles', router);
  };