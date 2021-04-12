const Customertbl = require("../models/Customertbl.model.js");
const nodemailer = require('nodemailer');
const Ordertbl = require("../models/Ordertbl.model.js");
const Orderitemtbl = require("../models/Orderitemtbl.model.js");
const Producttbl = require("../models/Producttbl.model.js");

exports.create = (req, res) => {
    if(!req.body.email || !req.body.password) {
       return res.status(400).send({
           message: "Please fill all required field"
       });
    }

    Customertbl.findOne({ email: req.body.email }).then(checkvar => {
        if(checkvar) {
          return res.status(400).send({
           message: "Email allready exist"
          });       
        } else {
            const dbvar = new Customertbl({
                name: req.body.name, 
                email: req.body.email,
                password: req.body.password,
                address: req.body.address,
                number: req.body.number
            });

            dbvar.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something went wrong while creating new user."
                });
            });
        }
    });
};

exports.check = (req, res) => {
    if(!req.body.email || !req.body.password) {
       return res.status(400).send({
           message: "Please fill all required field"
       });
    }

    Customertbl.findOne({ email:req.body.email, password:req.body.password, verified:false }).then(getdata => {
      if(getdata){
        return res.status(400).send({
          message: "Your email are not verified"
        });
      }        
    }); 
      
    Customertbl.findOne({ email:req.body.email, password:req.body.password, verified:true }).then(getdata => {
      if(getdata){  
        res.send(getdata);
      } else {
          return res.status(400).send({
            message: "Check your credentials"
          });
        }
    });   
};

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ascs739@gmail.com',
    pass: 'yourgmailpass'
  }
});

exports.getPassword = (req, res) => {
    Customertbl.findOne({ email:req.body.email }).then(getdata => {
      if(getdata){  

        var mailOptions = {
          from: 'ascs739@gmail.com',
          to: req.body.email,
          subject: 'Your Password',
          text: getdata.password
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      } else {
          return res.status(400).send({
            message: "Email is not exist"
          });
        }
    });    
};

exports.updateUser = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

    Customertbl.findByIdAndUpdate(req.params.id, {
        name: req.body.name, 
        password: req.body.password,
        address: req.body.address,
        number: req.body.number
    }, {new: true})
    
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "ID not found"
      });
    });
};  

exports.custOrders = (req,res) => {
    Orderitemtbl.find({email:req.params.email})
    .then(data => {
      const newarr = data;
      for (var key in newarr) {
       const convertId = newarr[key].product_id;
        Producttbl.find({_id:convertId}).select({ "pname": 1, "_id": 0})
        .then(result => {
          const finalres = newarr.concat(result);
          res.send(finalres);
        })
      }  
    });
};