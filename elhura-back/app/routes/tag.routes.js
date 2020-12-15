module.exports = app => {
    const tagController = require("../controllers/tag.controller.js");
    const articleTagsController = require("../controllers/article-tags.controller.js");

    var router = require("express").Router();

    //Create a tag
    router.post("/", tagController.create);
    //Retrieve all Tags
    router.get("/", tagController.findAll);
    // Retrieve a single tag with id
    router.get("/:id", tagController.findOne);
    // Update a tag by id
    router.put("/:id", tagController.update);
    // Delete a tag by id
    router.delete("/:id", tagController.delete);

    //Retrieve all articleTags by tag id
    router.get("/:id/articles", articleTagsController.findByTag);
    // Retrieve a single articleTag with idArticle and idTag
    router.get("/:idTag/articles/:idArticle", articleTagsController.findOne);
    // Delete a articleTag by tag
    router.delete("/:id/articles", articleTagsController.deleteByArticle);
    // Delete a articleTag by idArticle and idTag
    router.delete("/:idTag/articles/:idArticle", articleTagsController.deleteOne);

    app.use('/api/tags', router);
  };