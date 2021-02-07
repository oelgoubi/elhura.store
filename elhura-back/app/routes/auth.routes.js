module.exports = (app) => {
    const authController = require("../controllers/authentication.controller.js");

    var router = require("express").Router();

    //Check if a user is authenticated
    router.post("/check-auth", authController.isAuthenticated);
    //Validate a User
    router.post("/validate", authController.validate);
    // Check if a User exists
    router.post("/can-pass-to-next-register-steps", authController.canPassToNextRegisterSteps);
    router.post("/can-make-register-choice", authController.canMakeRegisterChoice);
    router.post("/can-confirm-register", authController.canConfirmRegister);
    //Check if a User exists
    router.post("/check", authController.checkIfUserExists);
    //Create a User
    router.post("/register", authController.register);
    //login a User
    router.post("/login", authController.login);

    app.use('/api/auth', router);
  };



  // Role 0 : admin
  // Role 1 : Client
  // Romle 2 : Company