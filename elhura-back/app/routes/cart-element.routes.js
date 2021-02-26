module.exports = (app,authenticateToken) => {
    const cartElementController = require("../controllers/cart-element.controller.js");
  
    var router = require("express").Router();

    //Create a cartElement
    router.post("/", authenticateToken, cartElementController.create);
    //Retrieve all Clients
    router.get("/", authenticateToken, cartElementController.findAll);
    // Retrieve a single cartElement with id
    router.get("/:id", authenticateToken, cartElementController.findOne);
    // Update a cartElement by id
    router.put("/:id", authenticateToken, cartElementController.update);
    // Delete a cartElement by id
    router.delete("/:id", authenticateToken, cartElementController.delete);

    app.use('/api/cart-elements',authenticateToken, router);
  };