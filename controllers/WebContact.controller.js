const Cformtable = require("../models/Cformtable.model.js");
const Producttbl = require("../models/Producttbl.model.js");

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