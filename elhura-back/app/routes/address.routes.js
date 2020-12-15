module.exports = app => {
    const addressController = require("../controllers/address.controller.js");
  
    var router = require("express").Router();

    //Create a address
    router.post("/", addressController.create);
    //Retrieve all Addresses
    router.get("/", addressController.findAll);
    // Retrieve a single address with id
    router.get("/:id", addressController.findOne);
    // Update an address by id
    router.put("/:id", addressController.update);
    // Delete an address by id
    router.delete("/:id", addressController.delete);

    app.use('/api/addresses', router);
  };