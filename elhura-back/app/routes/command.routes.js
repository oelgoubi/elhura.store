module.exports = (app,authenticateToken) => {
    const commandController = require("../controllers/command.controller.js");
    const commandLineController = require("../controllers/command-line.controller.js");
  
    var router = require("express").Router();

    //Create a command
    router.post("/", commandController.create);
    //Retrieve all Commands
    router.get("/", commandController.findAll);
    // Retrieve a single command with id
    router.get("/:id", commandController.findOne);
    // Update a command by id
    router.put("/:id", commandController.update);
    // Delete a command by id
    router.delete("/:id", commandController.delete);

    //Create a commandLine
    router.post("/:id/command-lines", commandLineController.create);
    //Retrieve all CommandLines
    router.get("/:id/command-lines", commandLineController.findByCommand);
    // Retrieve a single commandLine with id
    router.get("/:idCommand/command-lines/:idCommandLine", commandLineController.findOne);
    // Update a commandLine by id
    router.put("/:idCommand/command-lines/:idCommandLine", commandLineController.update);
    // Delete a commandLine by command
    router.delete("/:id/command-lines", commandLineController.deleteByCommand);
    // Delete a commandLine by idCommand and idCommandLine
    router.delete("/:idCommand/command-lines/:idCommandLine", commandLineController.deleteOne);

    app.use('/api/commands',authenticateToken, router);
  };