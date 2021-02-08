module.exports = (app,authenticateToken) => {
    const adminController = require("../controllers/admin.controller.js");
  
    var router = require("express").Router();

    //Create a admin
    router.post("/", authenticateToken, adminController.create);
    //Retrieve all Admins
    router.get("/", authenticateToken, adminController.findAll);
    // Retrieve a single admin with id
    router.get("/:id", authenticateToken, adminController.findOne);
    // Update a admin by id
    router.put("/:id", authenticateToken, adminController.update);
    // Delete a admin by id
    router.delete("/:id", authenticateToken, adminController.delete);

    app.use('/api/admins', router);
  };