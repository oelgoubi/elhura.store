module.exports = (app) => {
    const authController = require("../controllers/authentication.controller.js");
 
  
    var router = require("express").Router();

    //Create a User
    router.post("/register", authController.register);
    //login a User
    router.post("/login", authController.login);

    app.use('/api/auth', router);
  };



  // Role 0 : admin
  // Role 1 : Client
  // Romle 2 : Company