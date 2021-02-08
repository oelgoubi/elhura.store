module.exports = (app,authenticateToken) => {
    const shippingController = require("../controllers/shipping.controller.js");
  
    var router = require("express").Router();

    //Create a shipping
    router.post("/", authenticateToken, shippingController.create);
    //Retrieve all Shippings
    router.get("/", authenticateToken, shippingController.findAll);
    // Retrieve a single shipping with id
    router.get("/:id", authenticateToken, shippingController.findOne);
    // Update a shipping by id
    router.put("/:id", authenticateToken, shippingController.update);
    // Delete a shipping by id
    router.delete("/:id", authenticateToken, shippingController.delete);

    app.use('/api/shippings', router);
  };