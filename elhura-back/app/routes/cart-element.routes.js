module.exports = app => {
    const cartElementController = require("../controllers/cart-element.controller.js");
  
    var router = require("express").Router();

    //Create a cartElement
    router.post("/", cartElementController.create);
    //Retrieve all Clients
    router.get("/", cartElementController.findAll);
    // Retrieve a single cartElement with id
    router.get("/:id", cartElementController.findOne);
    // Update a cartElement by id
    router.put("/:id", cartElementController.update);
    // Delete a cartElement by id
    router.delete("/:id", cartElementController.delete);

    app.use('/api/cart-elements', router);
  };