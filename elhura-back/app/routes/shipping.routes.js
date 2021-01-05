module.exports = (app,authenticateToken) => {
    const shippingController = require("../controllers/shipping.controller.js");
  
    var router = require("express").Router();

    //Create a shipping
    router.post("/", shippingController.create);
    //Retrieve all Shippings
    router.get("/", shippingController.findAll);
    // Retrieve a single shipping with id
    router.get("/:id", shippingController.findOne);
    // Update a shipping by id
    router.put("/:id", shippingController.update);
    // Delete a shipping by id
    router.delete("/:id", shippingController.delete);

    app.use('/api/shippings',authenticateToken, router);
  };