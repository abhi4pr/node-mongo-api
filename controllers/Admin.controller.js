const multer = require("multer");

const Admintbl = require("../models/Admintbl.model.js");
const Producttbl = require("../models/Producttbl.model.js");
const Customertbl = require("../models/Customertbl.model.js");
const Cformtable = require("../models/Cformtable.model.js");
const Cattable = require("../models/Cattable.model.js");
const Articletbl = require("../models/Articletbl.model.js");

exports.check = (req, res) => {
    if(!req.body.email || !req.body.password) {
       return res.status(400).send({
           message: "Please fill all required field"
       });
    }
      
    Admintbl.findOne({ email:req.body.email, password:req.body.password }).then(getdata => {
      if(getdata){  
        res.send(getdata);
      } else {
          return res.status(400).send({
            message: "Check your credentials"
          });
        }
    });   
};

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './uploads');
  },
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
var upload = multer({ storage: storage });

//var cpUpload = upload.fields([{ name: 'pimg', maxCount: 1 }, { name: 'pgallery', maxCount: 3 }]);
exports.pcreate = [upload.single('pimg'),upload.array('pgallery',3),(req, res) => {

  if(!req.body.pname || !req.body.pprice) {
     return res.status(400).send({
         message: "Please fill required field"
     });
  }

    const dbvar = new Producttbl({
        pname: req.body.pname, 
        pprice: req.body.pprice,
        pimg: req.file.filename,
        pgallery: req.files.filename,
        pdesc: req.body.pdesc,
        cname: req.body.cname
    });

    dbvar.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating product."
        });
    });
}];  

exports.allProducts = (req, res) => {
    Producttbl.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while getting Product list."
        });
    });
};

exports.singlePro = (req, res) => {
    Producttbl.findById(req.params.id)
    .then(data => {
        res.send(data);
    }).catch(err => {
      res.status(400).send({
        message: "No product found with = " +req.params.id
      });
    });    
};        

exports.deletePro = (req, res) => {
    Producttbl.findByIdAndDelete(req.params.id)
    .then(data => {
        res.send({message: "Deleted successfully!"});
    }).catch(err => {
      res.status(400).send({
        message: "No product found with = " +req.params.id
      });
    });    
}; 

exports.allContacts = (req, res) => {
    Cformtable.find()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "something wrong while getting contact forms"
      });
    });
};

exports.allUsers = (req, res) => {
    Customertbl.find()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "something wrong while getting users"
      });
    });
};

exports.ccreate = (req, res) => {
    if(!req.body.cname) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

    const dbvar = new Cattable({
        cname: req.body.cname
    });

    dbvar.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating new category."
        });
    });
};

exports.allCat = (req, res) => {
    Cattable.find()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "something wrong while getting categories"
      });
    });
};

exports.acreate = [upload.single('apic'),(req, res) => {
    if(!req.body.aname) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

    const dbvar = new Articletbl({
        aname: req.body.aname,
        adesc: req.body.adesc,
        apic: req.file.filename,
    });

    dbvar.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating new Blog."
        });
    });
}];

exports.allArticles = (req, res) => {
    Articletbl.find()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "something wrong while getting Blogs"
      });
    });
};

exports.deleteArti = (req, res) => {
    Articletbl.findByIdAndDelete(req.params.id)
    .then(data => {
        res.send({message: "Deleted successfully!"});
    }).catch(err => {
      res.status(400).send({
        message: "No article found with = " +req.params.id
      });
    });    
}; 
