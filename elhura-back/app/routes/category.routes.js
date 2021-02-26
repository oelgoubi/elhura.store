module.exports = (app,authenticateToken) => {
    const categoryController = require("../controllers/category.controller.js");
  
    var router = require("express").Router();

    //Create a category
    router.post("/", authenticateToken, categoryController.create);
    //Retrieve all Clients
    router.get("/", authenticateToken, categoryController.findAll);
    // Retrieve a single category with id
    router.get("/:id", authenticateToken, categoryController.findOne);
    // Update a category by id
    router.put("/:id", authenticateToken, categoryController.update);
    // Delete a category by id
    router.delete("/:id", authenticateToken, categoryController.delete);

    app.use('/api/categories', authenticateToken,router);
  };