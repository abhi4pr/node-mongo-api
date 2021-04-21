const Cformtable = require("../models/Cformtable.model.js");
const Producttbl = require("../models/Producttbl.model.js");
const Ratingtbl = require("../models/Ratingtbl.model.js");
const Carttbl = require("../models/Carttbl.model.js");
const Ordertbl = require("../models/Ordertbl.model.js");
const Orderitemtbl = require("../models/Orderitemtbl.model.js");

exports.create = (req, res) => {
    if(!req.body.cemail || !req.body.cnumber) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

    const dbvar = new Cformtable({
        cname: req.body.cname, 
        cemail: req.body.cemail,
        cnumber: req.body.cnumber,
        csms: req.body.csms
    });

    dbvar.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong to sending form."
        });
    });
};

exports.findPro = (req, res) => {
    const regex = new RegExp(req.params.pname,'i');
    Producttbl.find({pname:regex}).then(data => {
        res.send(data);        
    });
};

exports.giveRating = (req, res) => {
    if(!req.body.email) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

    const revar = new Ratingtbl({
        pid: req.body.pid, 
        email: req.body.email,
        rating: req.body.rating,
        review: req.body.review
    });

    revar.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });
};

exports.getRating = (req, res) => {
    Ratingtbl.find({pid:req.params.id})
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "ID not found"
        }); 
    });
};

exports.addToCart = (req, res) => {
    if(!req.body.pid || !req.body.pname || !req.body.pprice || !req.body.email) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

    Carttbl.findOne({ pid: req.body.pid, email: req.body.email }).then(checkvar => {
        if(checkvar) {
          return res.status(400).send({
           message: "Product is allready in the cart"
          });       
        } else {
            const cvar = new Carttbl({
                pid: req.body.pid, 
                pname: req.body.pname,
                pprice: req.body.pprice,
                ppic: req.body.ppic,
                qty: 1,
                total_price: req.body.total_price,
                email: req.body.email
            });

          cvar.save()
          .then(data => {
             res.send(data);
          }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong."
          });
        });
      }
    });        
};

exports.getCartById = (req, res) => {
    Carttbl.find({email:req.params.email})    
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Error while updating cart"
      });
    });
};

exports.deleteScart = (req, res) => {
    Carttbl.findByIdAndDelete(req.params.id)
    .then(data => {
        res.send({message: "Item removed successfully!"});
    }).catch(err => {
      res.status(400).send({
        message: "No item found with = " +req.params.id
      });
    });    
}; 

exports.countCart = (req, res) => {
    Carttbl.find({email:req.params.email}).countDocuments()
    .then(data => {
      res.status(200).send([{well: data}]);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Something is not right"
      });
    });    
};

exports.updtCart = (req, res) => {
   if(!req.body.qty || !req.body.pprice) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

    Carttbl.findByIdAndUpdate(req.body.id,{
        qty: req.body.qty, 
        pprice: req.body.pprice,
        total_price: req.body.qty*req.body.pprice
    }, {new: true})
    
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Error while updating cart"
      });
    });
};

exports.iniOrder = (req,res) => {
    Carttbl.aggregate([
     { 
      $match: 
       { email: req.params.email } 
     },
     {
      $lookup:
       {
         from: "customertbls",
         localField: "email",
         foreignField: "email",
         as: "check_details"
       }
      }
    ])
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "something wrong while getting details"
      });
    });  
};

exports.wAllProducts = (req, res) => {
    Producttbl.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while getting Product list."
        });
    });
};

exports.wSinglePro = (req, res) => {
    Producttbl.findById(req.params.id)
    .then(data => {
        res.send(data);
    }).catch(err => {
      res.status(400).send({
        message: "No product found with = " +req.params.id
      });
    });    
};

exports.codOrder = (req, res) => {
    if(!req.body.grand_total || !req.body.number || !req.body.email) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

      const odvar = new Ordertbl({
        name: req.body.name, 
        email: req.body.email,
        address: req.body.address,
        number: req.body.number,
        pmode: 'Cash On Delivery',
        grand_total: req.body.grand_total
      });

      odvar.save()
      .then(function getLastId(){
        Ordertbl.find({}).sort({_id:-1}).limit(1)
        .then(data => {
          const finalId = data[0]._id;

          Carttbl.find({ email:req.body.email })
          .then(result => {
            const newarr = result;

             for (var key in newarr) {  
              const odi = new Orderitemtbl({
                order_id: finalId, 
                product_id: newarr[key].pid,
                qty: newarr[key].qty,
                price: newarr[key].pprice,
                email: req.body.email,
                pmode: 'Cash On Delivery',
                grand_total: req.body.grand_total
              });
            odi.save()
            .then(data => {
              Carttbl.deleteMany({email:req.body.email})
               .then(data => {
                 res.send({message: "Order placed successfully!"});
               })
            });
           } 
          })
        })
      });
};