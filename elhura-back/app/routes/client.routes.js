module.exports = (app,authenticateToken) => {
    const clientController = require("../controllers/client.controller.js");
    const favoritesController = require("../controllers/favorites.controller.js");
  
    var router = require("express").Router();

    //Create a client
    router.post("/", authenticateToken, clientController.create);
    //Retrieve all Clients
    router.get("/", authenticateToken, clientController.findAll);
    // Retrieve a single client with id
    router.get("/:id", authenticateToken, clientController.findOne);
    // Update a client by id
    router.put("/:id", authenticateToken, clientController.update);
    // Delete a client by id
    router.delete("/:id", authenticateToken, clientController.delete);

    //Create a favorites
    router.post("/:id/favorites", authenticateToken, favoritesController.create);
    //Retrieve all Favorites
    router.get("/:id/favorites", authenticateToken, favoritesController.findByClient);
    // Retrieve a single favorites with id
    router.get("/:idUser/favorites/:idArticle", authenticateToken, favoritesController.findOne);
    // Delete favorites by client id
    router.delete("/:id/favorites", authenticateToken, favoritesController.deleteByClient);
    // Delete a single favorite by id
    router.delete("/:idUser/favorites/:idArticle", authenticateToken, favoritesController.deleteOne);

    app.use('/api/clients',authenticateToken, router);
  };