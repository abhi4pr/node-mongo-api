const Users = require("../models/users.model.js");

exports.findAll = (req, res) => {
    Users.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while getting list of users."
        });
    });
};

exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

    const user = new Users({
        first_name: req.body.first_name, 
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone
    });

    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating new user."
        });
    });
};

exports.findOne = (req, res) => {
    Users.findById(req.params.id)
    .then(users => {
        if(!users) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });            
        }
        res.send(users);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error getting user with id " + req.params.id
        });
    });
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

    Users.findByIdAndUpdate(req.params.id, {
        first_name: req.body.first_name, 
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone
    }, {new: true})
    .then(users => {
        if(!users) {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        res.send(users);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });
};

exports.delete = (req, res) => {
    Users.findByIdAndRemove(req.params.id)
    .then(users => {
        if(!users) {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.id
        });
    });
};
