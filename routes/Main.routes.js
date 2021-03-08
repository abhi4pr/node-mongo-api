const express = require('express');
const WebContactController = require('../controllers/WebContact.controller.js');
const CustomerController = require('../controllers/Customer.controller.js');
const AdminController = require('../controllers/Admin.controller.js');
const router = express.Router();

  router.post("/", WebContactController.create);
  
  router.post("/cadd", CustomerController.create);
  router.post("/clogin", CustomerController.check);
  router.post("/getpass", CustomerController.getPassword);
  router.get("/search/:pname", WebContactController.findPro);

  router.post("/alogin", AdminController.check);
  router.post("/padd", AdminController.pcreate);
  router.get("/getpro", AdminController.allProducts);
  router.get("/getspro/:id", AdminController.singlePro);
  router.delete("/dltspro/:id", AdminController.deleltePro);
  router.get("/getconts", AdminController.allContacts);
  router.get("/getusers", AdminController.allUsers);
  router.post("/catadd", AdminController.ccreate);
  router.get("/getcat", AdminController.allCat);
  router.post("/badd", AdminController.acreate);
  router.get("/getblo", AdminController.allArticles);
  router.delete("/dltsarti/:id", AdminController.deleteArti);

module.exports = router;