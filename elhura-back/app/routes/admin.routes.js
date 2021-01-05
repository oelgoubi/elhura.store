module.exports = (app,authenticateToken) => {
    const adminController = require("../controllers/admin.controller.js");
  
    var router = require("express").Router();

    //Create a admin
    router.post("/", adminController.create);
    //Retrieve all Admins
    router.get("/", adminController.findAll);
    // Retrieve a single admin with id
    router.get("/:id", adminController.findOne);
    // Update a admin by id
    router.put("/:id", adminController.update);
    // Delete a admin by id
    router.delete("/:id", adminController.delete);

    app.use('/api/admins',authenticateToken, router);
  };