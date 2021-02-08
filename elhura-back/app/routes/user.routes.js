module.exports = (app) => {
    const userController = require("../controllers/user.controller.js");

    var router = require("express").Router();

    //Check user role
    router.post("/role", userController.fetchUserRole);

    app.use('/api/user', router);
  };
  // Role 0 : admin
  // Role 1 : Client
  // Romle 2 : Company