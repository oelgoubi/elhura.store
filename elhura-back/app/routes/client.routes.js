module.exports = app => {
    const clients = require("../controllers/client.controller.js");
  
    var router = require("express").Router();

    router.get("/", clients.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", clients.findOne);
  
    app.use('/api/client', router);
  };