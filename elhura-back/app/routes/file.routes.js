module.exports = (app) => {
    const fileController = require("../controllers/file.controller.js");
    var router = require("express").Router();

    router.post("/upload", fileController.upload);
    router.get("/", fileController.getListFiles);
    router.get("/:name", fileController.download);

    app.use('/api/files', router);
};