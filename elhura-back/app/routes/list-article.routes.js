module.exports = (app) => {
    const articleController = require("../controllers/article.controller.js");
    const favoritesController = require("../controllers/favorites.controller.js");
    const articleTagsController = require("../controllers/article-tags.controller.js");

    var router = require("express").Router();

    //Retrieve all Articles
    router.get("/", articleController.findAll);

    app.use('/api/list-articles', router);
  };