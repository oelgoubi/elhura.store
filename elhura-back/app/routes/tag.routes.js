module.exports = (app,authenticateToken) => {
    const tagController = require("../controllers/tag.controller.js");
    const articleTagsController = require("../controllers/article-tags.controller.js");

    var router = require("express").Router();

    //Create a tag
    router.post("/", authenticateToken, tagController.create);
    //Retrieve all Tags
    router.get("/", authenticateToken, tagController.findAll);
    // Retrieve a single tag with id
    router.get("/:id", authenticateToken, tagController.findOne);
    // Update a tag by id
    router.put("/:id", authenticateToken, tagController.update);
    // Delete a tag by id
    router.delete("/:id", authenticateToken, tagController.delete);

    //Retrieve all articleTags by tag id
    router.get("/:id/articles", authenticateToken, articleTagsController.findByTag);
    // Retrieve a single articleTag with idArticle and idTag
    router.get("/:idTag/articles/:idArticle", authenticateToken, articleTagsController.findOne);
    // Delete a articleTag by tag
    router.delete("/:id/articles", authenticateToken, articleTagsController.deleteByArticle);
    // Delete a articleTag by idArticle and idTag
    router.delete("/:idTag/articles/:idArticle", authenticateToken, articleTagsController.deleteOne);

    app.use('/api/tags',authenticateToken, router);
  };