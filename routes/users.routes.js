const express = require('express')
const userController = require('../controllers/users.controller.js');
const router = express.Router();

  router.post("/", userController.create);

  router.get("/", userController.findAll);

  //router.get("/published", userController.findAllPublished);

  router.get("/:id", userController.findOne);

  router.put("/:id", userController.update);

  router.delete("/:id", userController.delete);

module.exports = router;