module.exports = (app,authenticateToken) => {
    const addressController = require("../controllers/address.controller.js");
  
    var router = require("express").Router();

    //Create a address
    router.post("/", authenticateToken, addressController.create);
    //Retrieve all Addresses
    router.get("/", authenticateToken, addressController.findAll);
    // Retrieve a single address with id
    router.get("/:id", authenticateToken, addressController.findOne);
    // Update an address by id
    router.put("/:id", authenticateToken, addressController.update);
    // Delete an address by id
    router.delete("/:id", authenticateToken, addressController.delete);

    app.use('/api/addresses', router);
  };