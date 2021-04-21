const express = require('express');
const WebContactController = require('../controllers/WebContact.controller.js');
const CustomerController = require('../controllers/Customer.controller.js');
const AdminController = require('../controllers/Admin.controller.js');
const router = express.Router();

  router.post("/", WebContactController.create);
  router.get("/getprods", WebContactController.wAllProducts);
  router.get("/getsprods/:id", WebContactController.wSinglePro);
  router.get("/search/:pname", WebContactController.findPro);
  router.post("/addreview", WebContactController.giveRating);
  router.get("/getreview/:id", WebContactController.getRating);
  router.post("/addcart", WebContactController.addToCart);
  router.get("/cartbyid/:email", WebContactController.getCartById);
  router.get("/removecart/:id", WebContactController.deleteScart);
  router.get("/countcart/:email", WebContactController.countCart);
  router.put("/updtcart", WebContactController.updtCart);  
  router.get("/getcheck/:email", WebContactController.iniOrder);
  router.post("/placeorder", WebContactController.codOrder);

  router.post("/cadd", CustomerController.create);
  router.post("/clogin", CustomerController.check);
  router.post("/getpass", CustomerController.getPassword);
  router.put("/upuser/:id", CustomerController.updateUser);
  router.get("/usrorders/:email", CustomerController.custOrders);

  router.post("/alogin", AdminController.check);
  router.post("/padd", AdminController.pcreate);
  router.get("/getpro", AdminController.allProducts);
  router.get("/getspro/:id", AdminController.singlePro);
  router.delete("/dltspro/:id", AdminController.deletePro);
  router.get("/getconts", AdminController.allContacts);
  router.get("/getusers", AdminController.allUsers);
  router.post("/catadd", AdminController.ccreate);
  router.get("/getcat", AdminController.allCat);
  router.post("/badd", AdminController.acreate);
  router.get("/getblo", AdminController.allArticles);
  router.get("/getsblo/:id", AdminController.singleArti);
  router.delete("/dltsarti/:id", AdminController.deleteArti);

module.exports = router;