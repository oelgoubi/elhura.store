module.exports = app => {
    const categoryController = require("../controllers/category.controller.js");
  
    var router = require("express").Router();

    //Create a category
    router.post("/", categoryController.create);
    //Retrieve all Clients
    router.get("/", categoryController.findAll);
    // Retrieve a single category with id
    router.get("/:id", categoryController.findOne);
    // Update a category by id
    router.put("/:id", categoryController.update);
    // Delete a category by id
    router.delete("/:id", categoryController.delete);

    app.use('/api/categories', router);
  };