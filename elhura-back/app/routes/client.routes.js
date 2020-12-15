module.exports = app => {
    const clientController = require("../controllers/client.controller.js");
    const favoritesController = require("../controllers/favorites.controller.js");
  
    var router = require("express").Router();

    //Create a client
    router.post("/", clientController.create);
    //Retrieve all Clients
    router.get("/", clientController.findAll);
    // Retrieve a single client with id
    router.get("/:id", clientController.findOne);
    // Update a client by id
    router.put("/:id", clientController.update);
    // Delete a client by id
    router.delete("/:id", clientController.delete);

    //Create a favorites
    router.post("/:id/favorites", favoritesController.create);
    //Retrieve all Favorites
    router.get("/:id/favorites", favoritesController.findByClient);
    // Retrieve a single favorites with id
    router.get("/:idUser/favorites/:idArticle", favoritesController.findOne);
    // Delete favorites by client id
    router.delete("/:id/favorites", favoritesController.deleteByClient);
    // Delete a single favorite by id
    router.delete("/:idUser/favorites/:idArticle", favoritesController.deleteOne);

    app.use('/api/clients', router);
  };